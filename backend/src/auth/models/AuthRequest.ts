import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'src/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: CreateUserDto;
}
