
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

  // Recursive function to fetch employee hierarchy by position
  async getEmployeeHierarchyByPosition(id: number): Promise<any> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['child'],
    });

    if (!employee) return null;

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
