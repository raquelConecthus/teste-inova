import { Request } from 'express';
import { Users } from 'src/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: Users;
}
