import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CheckUserIdMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    
    const user = await this.userService.findById(userId);
    if (!user) {      
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        `invalid user id: ${userId}`,
      );
    }

    next();
  }
}
