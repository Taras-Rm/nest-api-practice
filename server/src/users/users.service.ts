import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    const existingUserEmail = this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUserEmail) {
      throw new BadRequestException(
        `User with email: ${createUserDto.email} already exists`,
      );
    }

    return this.userRepository.create(createUserDto);
  }

  findById(id: string) {
    return this.userRepository.findById(id);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const existingUserEmail = this.userRepository.findByEmail(
      updateUserDto.email,
    );
    if (existingUserEmail) {
      throw new BadRequestException(
        `User with email: ${updateUserDto.email} already exists`,
      );
    }

    return this.userRepository.update(id, updateUserDto);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
