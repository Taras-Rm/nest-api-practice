import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const requestInfo = `Request <<< METHOD: ${req.method}, URL: ${req.url}`;

    res.on('finish', () => {
      console.log(`${requestInfo} => Response <<< STATUS: ${res.statusCode}`);
    });

    next();
  }
}
