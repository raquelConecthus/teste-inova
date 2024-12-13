// NestJS
import {
  BadGatewayException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// Password
import { AuthGuard } from '@nestjs/passport';
// Decorators
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      const canActivate = super.canActivate(context);

      if (typeof canActivate === 'boolean') {
        return canActivate;
      }

      return (canActivate as Promise<boolean>).catch((error) => {
        console.error('JWT validation error:', error.message); // Log para debug
        throw new UnauthorizedException('Invalid or missing token');
      });
    } catch (error) {
      console.error('Unexpected error in JwtAuthGuard:', error.message);
      throw new UnauthorizedException('Invalid or missing token');
    }
  }
}
