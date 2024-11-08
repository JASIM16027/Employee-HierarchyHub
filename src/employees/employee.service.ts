
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { Repository } from 'typeorm';
import { AppCacheService } from '../appCacheModule/appCache.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    private readonly cacheService: AppCacheService
  ) { }

  // Recursive function to fetch employee hierarchy by employee id

  async getEmployeeHierarchyByPosition(id: number): Promise<any> {
    let employee: EmployeeEntity;
    const cachedData = await this.cacheService.get(id.toString());
    if (cachedData) {
      console.log("Found employee hierarchy", cachedData)
      employee = cachedData;
    } else {
      employee = await this.employeeRepository.findOne({
        where: { id },
        relations: ['child'],
      });
    }


    if (!employee) return null;
    // Cache the fetched data to improve performance and reduce database queries

    await this.cacheService.set(id.toString(), employee);  // default ttl->3600

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

  // Function to handle the recursive fetching of child
  private async getChildren(children: EmployeeEntity[]): Promise<any[]> {
    if (!children || children.length === 0) return null;

    // Use Promise.all to process the child employees recursively
    return Promise.all(
      children.map(async (child) => {
        return await this.getEmployeeHierarchyByPosition(child.id);
      }),
    );
  }
}
