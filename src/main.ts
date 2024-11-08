import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
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
