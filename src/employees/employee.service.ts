import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async getEmployeeHierarchy(id: number): Promise<any> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['child'],
    });

    if (!employee) return null;

    const result = {
      id: employee.id,
      name: employee.name,
      positionId: employee.positionId,
      positionName: employee.positionName,
      child:
        employee.child?.length > 0
          ? await Promise.all(
              employee.child.map((child) =>
                this.getEmployeeHierarchy(child.id),
              ),
            )
          : [],
    };

    return result;
  }
}
