import { IsBoolean, IsIn, IsInt, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsBoolean()
  can_create: boolean;

  @IsBoolean()
  can_read: boolean;

  @IsBoolean()
  can_update: boolean;

  @IsBoolean()
  can_delete: boolean;

  @IsBoolean()
  can_approve: boolean;
}
