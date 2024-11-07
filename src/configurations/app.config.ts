// import * as Joi from 'joi';
// import * as dotenv from 'dotenv';
// dotenv.config();

// export const APP_CONFIG = {
//   APP_ENV: process.env.APP_ENV || 'development',
//   APP_PORT: parseInt(process.env.APP_PORT || '4000', 10),
//   TYPE_ORM: {
//     HOST: process.env.DB_HOST,
//     PORT: process.env.DB_PORT,
//     USER_NAME: process.env.DB_USERNAME,
//     PASSWORD: process.env.DB_PASSWORD,
//     DATABASE: process.env.DB_DATABASE,
//     MIGRATIONS_TABLE_NAME: 'migration',
//     ENTITIES: [__dirname + '/../../dbModules/**/*.entity.{js,ts}'],
//     CLI: {
//       MIGRATIONS_DIR: 'src/migration',
//     },
//     SYNCHRONIZE: false,
//     DEBUG: process.env.DB_DEBUG || false,
//   },
// };

// export const AppConfigSchema = Joi.object({
//   APP_ENV: Joi.string().valid('development', 'production', 'test', 'local'),
//   APP_PORT: Joi.number().required(),
//   TYPE_ORM: Joi.object({
//     HOST: Joi.string().required(),
//     PORT: Joi.number().required(),
//     USER_NAME: Joi.string().required(),
//     PASSWORD: Joi.string().required(),
//     DATABASE: Joi.string().required(),
//     MIGRATIONS_TABLE_NAME: Joi.string().required(),
//     ENTITIES: Joi.array().required(),
//     CLI: Joi.object({
//       MIGRATIONS_DIR: Joi.string().required(),
//     }),
//     SYNCHRONIZE: Joi.boolean().required(),
//   }),
// });
