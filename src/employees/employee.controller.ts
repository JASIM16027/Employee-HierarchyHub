
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post('insertData')
  async addBulkEmployeeData() {
    try {
      const sampleEmployeeData: any[] = [
        { id: 1, name: 'Rafi', positionId: 1, positionName: 'CTO', parentId: null },
        { id: 2, name: 'Md. Jasim Uddin', positionId: 2, positionName: 'Senior Software Engineer', parentId: 1 },
        { id: 3, name: 'Rakib', positionId: 3, positionName: 'Software Engineer', parentId: 2 },
        { id: 4, name: 'Tamim', positionId: 4, positionName: 'Junior Software Engineer', parentId: 3 },
      ];
      await this.employeeService.resetAllData();
      const newEmployees = await this.employeeService.addBulkEmployees(sampleEmployeeData);

      return {
        message: 'Employees data inserted successfully',
        employees: newEmployees,
      };
    } catch (error) {
      throw new HttpException(
        'Error inserting employees data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('hierarchy/:id')
  async getEmployeeHierarchy(@Param('id', ParseIntPipe) id: number) {
    let employeeHierarchy = await this.employeeService.getEmployeeHierarchyByPosition(id);

    if (!employeeHierarchy || employeeHierarchy.length === 0) {
      throw new HttpException(
        'No employees hierarchy found for this employee id',
        HttpStatus.NOT_FOUND,
      );
    }

    employeeHierarchy = Array.isArray(employeeHierarchy) ? employeeHierarchy : [employeeHierarchy];
    return employeeHierarchy.flatMap((employee: any) => employee.child || [])
  }

}
