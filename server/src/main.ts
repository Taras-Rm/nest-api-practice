import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const PORT = app.get(ConfigService).get<number>('PORT');

  await app.listen(PORT);
}
bootstrap();
