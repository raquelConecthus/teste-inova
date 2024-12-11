import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 3),
    };

    console.log('This action adds a new user');
    const createdUser = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(createdUser);
    return { ...savedUser, password: undefined };
  }

  findAll() {
    return `This action returns all users`;
  }

  findByEmail(email: string) {
    console.log(`This action returns a #${email} user`);
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
