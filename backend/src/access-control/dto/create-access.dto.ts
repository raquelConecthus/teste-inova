export interface CreateAccessDto {
  email: string;
  password: string;
  name: string;
  departmentId: number;
  permissions: PermissionAC[];
}

export interface PermissionAC {
  phaseId: number;
  name: string;
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
  can_approve: boolean;
}
