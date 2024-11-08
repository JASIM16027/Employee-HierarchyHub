import * as Joi from 'joi';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppConfigSchema = Joi.object({
  APP_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  APP_PORT: Joi.number().default(4000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DATABASE: Joi.string().required(),
  MIGRATIONS_TABLE_NAME: Joi.string().default('migration'),
  SYNCHRONIZE: Joi.boolean().default(false),
  DEBUG: Joi.boolean().default(false),
});

export const appConfig = {
  APP_ENV: process.env.APP_ENV || 'development',
  APP_PORT: parseInt(process.env.APP_PORT || '4000', 10),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DATABASE,
  MIGRATIONS_TABLE_NAME: 'migration',
  SYNCHRONIZE: false,
  DEBUG: process.env.DEBUG === 'true',
};