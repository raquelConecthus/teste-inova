import { UserRoles } from './UserPayload';

export interface UserFromJwt {
  id: number;
  email: string;
  name: string;
  departmentId: number;
  userRoles: UserRoles[];
}
