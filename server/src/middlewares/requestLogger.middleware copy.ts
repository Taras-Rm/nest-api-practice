import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const requestInfo = `Request <<< METHOD: ${req.method}, URL: ${req.url}`

    // TODO: add real logger
    res.on("finish", () => {
      console.log(`${requestInfo} => Response <<< STATUS: ${res.statusCode}`);
    });
  
    next();
  }
}
