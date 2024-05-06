import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CheckUserIdMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    const user = this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException(`invalid user id: ${userId}`);
    }

    next();
  }
}
