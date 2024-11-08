import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { EmployeeEntity } from 'src/employees/employee.entity';
dotenv.config();

export const APP_CONFIG = {
  APP_ENV: process.env.APP_ENV || 'development',
  APP_PORT: parseInt(process.env.APP_PORT || '4000', 10),
  TYPE_ORM: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER_NAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,
    MIGRATIONS_TABLE_NAME: 'migration',
    ENTITIES: [EmployeeEntity],
    CLI: {
      MIGRATIONS_DIR: 'src/migration',
    },
    SYNCHRONIZE: false,
    DEBUG: process.env.DB_DEBUG || false,
  },

  REDIS: {
    CON_URL: process.env.REDIS_CON_URL,
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    TTL: process.env.CACHE_TTL,
    MAX_ITEM: process.env.MAX_ITEM_IN_CACHE,
    DB: process.env.REDIS_DB,
  },
};

export const AppConfigSchema = Joi.object({
  APP_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  APP_PORT: Joi.number().default(4000),
  TYPE_ORM: Joi.object({
    HOST: Joi.string().required(),
    PORT: Joi.number().default(3306),
    USERNAME: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    DATABASE: Joi.string().required(),
    MIGRATIONS_TABLE_NAME: Joi.string().default('migration'),
    ENTITIES: Joi.array().items(Joi.string()).required(),
    SYNCHRONIZE: Joi.boolean().default(false),
    DEBUG: Joi.boolean().default(false),
  }).required(),

  RADIS: Joi.object({
    CON_URL: Joi.string(),
    HOST: Joi.string(),
    PORT: Joi.number(),
    TTL: Joi.number(),
    MAX_ITEM: Joi.number(),
    DB: Joi.string(),
  }),
});
