
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
  @Post('resetRedisCache')
  async clearRedisCache() {
    try {
      await this.employeeService.resetAllData();
      return { message: 'Redis cache cleared successfully' };
      
    } catch (error) {
      throw new HttpException(
        'Error clearing Redis cache',
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
