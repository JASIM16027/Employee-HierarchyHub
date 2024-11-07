import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
