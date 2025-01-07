import { Permission } from '@prisma/client';

export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  departmentId: number;
  userRoles: UserRoles[];
  iat?: number;
  exp?: number;
}

export interface UserRoles {
  id: number;
  roleId: number;
  phaseId: number;
}
