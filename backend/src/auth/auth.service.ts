import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) return { ...user, password: undefined };
    }
    throw new Error('Email address or password provided is incorrect');
  }

  async login(user: CreateUserDto): Promise<UserToken> {
    const userLogin = await this.userService.getByLogin(user.email);
    // console.log(userLogin);
    // console.log(userLogin.userRoles[0]);
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      userRoles: userLogin.userRoles,
      departmentId: user.departmentId,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }
}
