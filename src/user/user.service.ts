import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    console.log('Finding user with ID:', id);
    return await this.userRepo.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'lastName',
        'avatarUrl',
        'hashedRefreshToken',
        'role',
      ],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateRefreshToken(
    userId: number,
    hashedRefreshToken: string | undefined,
  ) {
    return this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

// $argon2id$v=19$m=65536,t=3,p=4$PfMZhcDueLqSG+pJz8XxkQ$IzlX4zGcjstzD8r3aL0DKg+DME434+8EROArtJeI9yg
