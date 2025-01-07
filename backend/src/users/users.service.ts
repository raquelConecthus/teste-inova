import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  // async create(createUserDto: CreateUserDto) {
  //   const data = {
  //     ...createUserDto,
  //     password: await bcrypt.hash(createUserDto.password, 3),
  //   };

  //   console.log('This action adds a new user');
  //   const createdUser = this.userRepository.create(data);
  //   const savedUser = await this.userRepository.save(createdUser);
  //   return { ...savedUser, password: undefined };
  // }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    console.log('This action adds a new user');

    try {
      const data: Prisma.UserCreateInput = {
        email: createUserDto.email,

        name: createUserDto.name,
        department: {
          connect: { id: createUserDto.departmentId }, // Relacionando o departamento
        },
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const createdUser = await this.prisma.user.create({ data });

      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Could not create user. Please try again later.');
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    console.log(`This action returns all users`);
    // const data = await this.userRepository.find();

    const allUsers = await this.prisma.user.findMany();
    allUsers.map((user) => (user.password = undefined));
    return allUsers;
  }

  async getByLogin(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email, // Busca apenas pelo email
      },
      include: {
        userRoles: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   console.log(`This action updates a #${id} user`);
  //   const user = await this.userRepository.findOneBy({ id });
  //   if (!user) return null;
  //   this.userRepository.merge(user, updateUserDto);

  //   const savedUser = await this.userRepository.save(user);
  //   return { ...savedUser, password: undefined };
  // }

  // async remove(id: string) {
  //   console.log(`This action removes a #${id} user`);
  //   const user = await this.userRepository.findOneBy({ id });

  //   if (!user) return null;
  //   return this.userRepository.remove(user);
  // }
}
