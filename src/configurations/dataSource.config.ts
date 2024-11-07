import { DataSource, DataSourceOptions } from 'typeorm';
import { APP_CONFIG } from './app.config';

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  host: APP_CONFIG.TYPEORM.HOST,
  port: APP_CONFIG.TYPEORM.PORT,
  username: APP_CONFIG.TYPEORM.USERNAME,
  password: APP_CONFIG.TYPEORM.PASSWORD,
  database: APP_CONFIG.TYPEORM.DATABASE,
  entities: APP_CONFIG.TYPEORM.ENTITIES,
  migrationsTableName: APP_CONFIG.TYPEORM.MIGRATIONS_TABLE_NAME,
  synchronize: APP_CONFIG.TYPEORM.SYNCHRONIZE,
  logging: APP_CONFIG.TYPEORM.DEBUG,
  extra: {
    connectionLimit: 20,
    connectTimeout: 10000, // 10 seconds
  },
};

export const AppDataSource = new DataSource(DATA_SOURCE_OPTIONS);
