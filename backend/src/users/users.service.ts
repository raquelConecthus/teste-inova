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

  async findAll() {
    console.log(`This action returns all users`);
    const data = await this.userRepository.find();
    data.map((user) => (user.password = undefined));
    return data;
  }

  findByEmail(email: string) {
    console.log(`This action returns a #${email} user`);
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(`This action updates a #${id} user`);
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;
    this.userRepository.merge(user, updateUserDto);

    const savedUser = await this.userRepository.save(user);
    return { ...savedUser, password: undefined };
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} user`);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return null;
    return this.userRepository.remove(user);
  }
}
