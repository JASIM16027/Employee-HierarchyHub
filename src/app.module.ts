import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employees/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employees/employee.entity';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppCacheModule } from './cacheModules/appCacheModule/appCache.module';
import { RedisCacheModule } from './cacheModules/redisCacheModule/redis.module';
import { APP_CONFIG, AppConfigSchema } from './configurations/app.config';
import { DATA_SOURCE_OPTIONS } from './configurations/dataSource.config';
dotenv.config();
console.log(DATA_SOURCE_OPTIONS)
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [() => process.env], 
    //   validationSchema: Joi.object({
    //     DB_HOST: Joi.string().hostname().required(),
    //     DB_PORT: Joi.number().port().required(),
    //     DB_USERNAME: Joi.string().required(),
    //     DB_PASSWORD: Joi.string().required(),
    //     DATABASE: Joi.string().required(),
    //   }), 
    //   isGlobal: true, 
    // }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule], 
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USERNAME'),
    //     password: configService.get<string>('DB_PASSWORD'),
    //     database: configService.get<string>('DATABASE'),
    //     entities: [EmployeeEntity],
    //     synchronize: false,
    //   }),
    // }),

    ConfigModule.forRoot({
      isGlobal: true, 
      load: [() => APP_CONFIG], 
      //validationSchema: AppConfigSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => DATA_SOURCE_OPTIONS,
    }),
  

    EmployeeModule,
    // AppCacheModule,
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
