import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: v4(),
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      return null;
    }

    const { name, email, age } = updateUserDto;

    user.name = name;
    user.age = age;
    user.email = email;

    return user;
  }

  async delete(id: string): Promise<string> {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      return '';
    }

    const userIdForDelete = this.users[idx].id;

    this.users.splice(idx, 1);

    return userIdForDelete;
  }
}
