import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { Observable } from 'rxjs';

export function AccessGuard(
  requiredPermission: keyof Permission,
  phase: number,
) {
  @Injectable()
  class AccessControlGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      const userRoles = user.userRoles;
      console.log(userRoles);

      if (!userRoles || userRoles.length === 0) {
        return false;
      }

      const hasAccess = userRoles.some((userRole) => {
        if (userRole.phaseId !== phase) {
          return false;
        }

        const permission = userRole.permission;
        return permission && permission[requiredPermission];
      });

      return hasAccess;
    }
  }
  return AccessControlGuard;
}
