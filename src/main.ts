/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));
  app.useStaticAssets(join(__dirname, '..', 'assets/html'));
  app.use("/assets/css",express.static(join(__dirname,"..","assets/css")));
  app.use("/assets/fonts/css",express.static(join(__dirname,"..","assets/fonts/css")));
  app.use("/assets/fonts/webfonts",express.static(join(__dirname,"..","assets/fonts/webfonts")));
  app.use("/assets/img",express.static(join(__dirname,"..","assets/img")));
  app.use("/assets/audio",express.static(join(__dirname,"..","assets/audio")));
  app.use("/assets/video",express.static(join(__dirname,"..","assets/video")));
  app.use("/assets/js",express.static(join(__dirname,"..","assets/js")));
  app.setViewEngine("html");
  await app.listen(3000);
}
bootstrap();
