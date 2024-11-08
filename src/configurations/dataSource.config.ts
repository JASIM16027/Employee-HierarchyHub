import { EmployeeEntity } from "../employees/employee.entity";
import { appConfig } from "./app.config";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT,
  username: appConfig.DB_USERNAME,
  password: appConfig.DB_PASSWORD,
  database: appConfig.DB_NAME,
  entities: [EmployeeEntity],
  migrationsTableName: appConfig.MIGRATIONS_TABLE_NAME,
  synchronize: appConfig.SYNCHRONIZE,
  logging: appConfig.DEBUG,
  extra: {
    connectionLimit: 20,
    connectTimeout: 10000,
  },
};


export const AppDataSource = new DataSource(dataSourceOptions);

