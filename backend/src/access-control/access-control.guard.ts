import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

export function AccessGuard(role: number, phase: number) {
  @Injectable()
  class AccessControlGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const userRoles = user.userRoles;
      console.log(userRoles);

      if (!userRoles || userRoles.length === 0) {
        return false;
      }

      const hasAccess = userRoles.some(
        (userRole) => userRole.roleId === role && userRole.phaseId === phase,
      );

      return hasAccess;
    }
  }
  return AccessControlGuard;
}
