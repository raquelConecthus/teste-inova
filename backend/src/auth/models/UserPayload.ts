export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  department: number;
  iat?: number;
  exp?: number;
}
