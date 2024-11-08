
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { AppCacheService } from '../cacheModules/appCacheModule/appCache.service';
import { RedisCacheService } from '../cacheModules/redisCacheModule/redis.service';
import { CentralLogger } from '../loggerServices/centralLogger.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    private readonly cacheService: AppCacheService,
    private readonly redisCacheService: RedisCacheService,
    private readonly logger: CentralLogger,
  ) { }

  /**
   * Fetches employee hierarchy by position using id.
   * It first checks the cache, then queries the database if not found in the cache.
   */
  async getEmployeeHierarchyByPosition(id: number): Promise<any> {
    // const cachedData = await this.cacheService.get(id.toString());
    // Check if data is already in the cache
    const cachedData = await this.redisCacheService.get(id.toString());

    if (cachedData) {
      this.logger.info(`Cache hit for employee ID ${id}`);
      return this.formatEmployeeData(JSON.parse(cachedData));
    }

    // If data is not in the cache, fetch it from the database
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['child'],
    });

    if (!employee) {
      this.logger.warn(`Employee with ID ${id} not found`);
      return null;
    }

    //await this.cacheService.set(id.toString(), employee);  // default ttl->3600
    // Cache the result to optimize future queries
    await this.redisCacheService.set(id.toString(), JSON.stringify(employee));
    this.logger.info(`Cache set for employee ID ${id}`);

    return this.formatEmployeeData(employee);
  }

  /**
   * Formats the employee data with hierarchy information.
   * @param employee - The employee entity
   */
  private async formatEmployeeData(employee: EmployeeEntity): Promise<any> {
    // Structure the result to include employee and child hierarchy
    const result = {
      id: employee.id,
      name: employee.name,
      positionId: employee.positionId,
      positionName: employee.positionName,
      child: await this.getChildren(employee.child),
    };

    return result;
  }

  /**
   * Recursively fetches the children of a given employee.
   * @param children - List of child employee entities
   */
  private async getChildren(children: EmployeeEntity[]): Promise<any[]> {
    if (!children || children.length === 0) return [];

    // Recursively fetch children data
    return Promise.all(
      children.map(async (child) => {
        return this.getEmployeeHierarchyByPosition(child.id);
      }),
    );
  }

  async addBulkEmployees(employeeData: EmployeeEntity[]): Promise<EmployeeEntity[]> {
    // Reset the cache and database before adding new data

    await this.redisCacheService.flushAllCache();
    this.logger.info(`Redis cache data has been deleted!`);

    const employees = this.employeeRepository.create(employeeData); 
    return this.employeeRepository.save(employees);
  }

  async resetAllData(): Promise<void> {
    await this.employeeRepository.clear();
  }

}
