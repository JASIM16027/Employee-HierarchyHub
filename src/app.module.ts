import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employees/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employees/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'Employee-HierarchyHub',
      entities: [EmployeeEntity],
      synchronize: false,
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
