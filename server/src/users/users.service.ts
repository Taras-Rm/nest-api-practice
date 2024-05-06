import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUserEmail = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUserEmail) {
      throw new BadRequestException(
        `User with email: ${createUserDto.email} already exists`,
      );
    }

    return await this.userRepository.create(createUserDto);
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUserEmail = await this.userRepository.findByEmail(
      updateUserDto.email,
    );
    if (existingUserEmail) {
      throw new BadRequestException(
        `User with email: ${updateUserDto.email} already exists`,
      );
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
