import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return { message: 'User created successfully', user };
    } catch (error) {
      console.error('Failed to create user:', error.message);
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error:
            'It was not possible to connect with Database, check it and try again.',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   const user = await this.usersService.remove(id);
  //   if (!user) throw new NotFoundException();
  //   return {
  //     message: 'User removed!',
  //   };
  // }
}
