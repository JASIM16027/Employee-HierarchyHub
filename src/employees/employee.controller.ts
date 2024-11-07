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
    const employees = await this.employeeService.getEmployeeHierarchy(id);

    if (!employees || employees.length === 0) {
      throw new HttpException(
        'No employees found for this position',
        HttpStatus.NOT_FOUND,
      );
    }

    return employees.child;
  }
}
