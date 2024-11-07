import * as Joi from 'joi';
import * as dotenv from 'dotenv';
dotenv.config();

export const APP_CONFIG = {
  APP_ENV: process.env.APP_ENV || 'development',
  APP_PORT: parseInt(process.env.APP_PORT || '4000', 10),
  TYPEORM: {
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DB_PORT, 10),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,
    MIGRATIONS_TABLE_NAME: 'migration',
    ENTITIES: [__dirname + '/../modules/**/*.entity.{js,ts}'],
    SYNCHRONIZE: process.env.TYPEORM_SYNC === 'true',
    DEBUG: process.env.TYPEORM_DEBUG === 'true',
  },
};

export const AppConfigSchema = Joi.object({
  APP_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  APP_PORT: Joi.number().default(4000),
  TYPEORM: Joi.object({
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
});
