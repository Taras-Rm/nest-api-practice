import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import ApiError from '../errors/ApiError';

@Catch(ApiError)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { code, data } = ApiError.getInfo(error);

    response.status(code).json(data);
  }
}
