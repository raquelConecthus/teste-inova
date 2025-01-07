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
  role: {
    id: number;
    name: string;
    permission: {
      id: number;
      can_create: boolean;
      can_read: boolean;
      can_update: boolean;
      can_delete: boolean;
      can_approve: boolean;
    };
  };
}
