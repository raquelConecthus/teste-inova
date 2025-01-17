import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../entities/user.entity';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  id?: number;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  departmentId: number;
}
