import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from '@/constants';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PERMISSIONS } from './permissions';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: '10mb' });
  app.useBodyParser('urlencoded', { limit: '50mb', extended: true });
  app.enableCors({
    origin: '*'
  })
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(APP_PORT, () => console.log(`Server running on port ${APP_PORT}`));
}
bootstrap();
