import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import * as dotenv from 'dotenv';
import { AppDataSource, runMigrations } from './configurations/dataSource.config';
import { appConfig } from './configurations/app.config';
dotenv.config();

async function bootstrap() {
  if (appConfig.AUTO_RUN_MIGRATIONS) {
    await runMigrations();
  }
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(
    `*** Employee-hierarchy-hub running on http://localhost:${PORT} ***`,
  );
}

bootstrap();
