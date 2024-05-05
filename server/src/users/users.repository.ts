import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: v4(),
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User {
    return this.users.find((u) => u.id === id);
  }

  findByEmail(email: string): User {
    return this.users.find((u) => u.email === email);
  }

  findAll(): User[] {
    return this.users;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
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

  delete(id: string): string {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      return '';
    }

    const userIdForDelete = this.users[idx].id;

    this.users.splice(idx, 1);

    return userIdForDelete;
  }
}
