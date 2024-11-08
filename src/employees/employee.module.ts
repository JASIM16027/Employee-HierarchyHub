import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { AppCacheService } from '../cacheModules/appCacheModule/appCache.service';
import { RedisCacheService } from '../cacheModules/redisCacheModule/redis.service';
import { RedisCacheModule } from '../cacheModules/redisCacheModule/redis.module';



@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity]), RedisCacheModule],
  providers: [EmployeeService, AppCacheService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule { }
