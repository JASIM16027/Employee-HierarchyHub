import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('hierarchy/:id')
  async getEmployeeHierarchy(@Param('id', ParseIntPipe) id: number) {
    let employeeHierarchy = await this.employeeService.getEmployeeHierarchyByPosition(id);

    if (!employeeHierarchy || employeeHierarchy.length === 0) {
      throw new HttpException(
        'No employees hierarchy found for this employee id',
        HttpStatus.NOT_FOUND,
      );
    }

    employeeHierarchy = Array.isArray(employeeHierarchy)?employeeHierarchy : [employeeHierarchy];
    return this.getChildrenData(employeeHierarchy);
  }

  private getChildrenData(employeeHierarchy: any[]): any[] {
   
    return employeeHierarchy.flatMap((employee) => employee.child || []);
  }
}
