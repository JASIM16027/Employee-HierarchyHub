import { DataSource, DataSourceOptions } from 'typeorm';
import { APP_CONFIG } from './app.config';
import * as dotenv from 'dotenv';
dotenv.config();
export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  host: APP_CONFIG.TYPE_ORM.HOST,
  port: +APP_CONFIG.TYPE_ORM.PORT,
  username: APP_CONFIG.TYPE_ORM.USER_NAME,
  password: APP_CONFIG.TYPE_ORM.PASSWORD,
  database: APP_CONFIG.TYPE_ORM.DATABASE,
  entities: APP_CONFIG.TYPE_ORM.ENTITIES,
  migrationsTableName: APP_CONFIG.TYPE_ORM.MIGRATIONS_TABLE_NAME,
  synchronize: APP_CONFIG.TYPE_ORM.SYNCHRONIZE,
  logging: false,
  extra: {
    connectionLimit: 20,
    connectTimeout: 10000, // 10 seconds
  },
};

export const AppDataSource = new DataSource(DATA_SOURCE_OPTIONS);
