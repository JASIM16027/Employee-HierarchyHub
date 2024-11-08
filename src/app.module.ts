import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employees/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from './cacheModules/redisCacheModule/redis.module';
import { appConfig, AppConfigSchema } from './configurations/app.config';
import { dataSourceOptions } from './configurations/dataSource.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [() => appConfig], 
      validationSchema: AppConfigSchema,
    }),
    
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceOptions,
    }),
  
    EmployeeModule,
    // AppCacheModule,
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
