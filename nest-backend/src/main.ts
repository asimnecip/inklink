import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all origins
  // app.enableCors({
  //   origin: "*",
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // });
  await app.listen(3001); // Or whatever your backend port is
}
bootstrap();