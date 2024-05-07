import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './filters/CustomException.filter';
import ApiError from './errors/ApiError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // exception filter
  app.useGlobalFilters(new CustomExceptionFilter());
  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        return new ApiError(
          HttpStatus.BAD_REQUEST,
          'failed',
          Object.values(errors[0].constraints)[0],
        );
      },
    }),
  );
  app.setGlobalPrefix('api');

  const PORT = app.get(ConfigService).get<number>('PORT');

  await app.listen(PORT);
}
bootstrap();
