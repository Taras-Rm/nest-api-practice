import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // create new user
  // POST api/users
  @Post('')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // get user by id
  // GET api/users/:id
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // get users
  // GET api/users
  @Get('')
  getUsers() {
    return this.userService.findAll();
  }

  // update user by id
  // PUT api/users/:id
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // delete user by id
  // DELETE api/users
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
