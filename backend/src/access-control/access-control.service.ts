import { Injectable } from '@nestjs/common';
import { PermissionService } from 'src/permission/permission.service';
import { UsersService } from 'src/users/users.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { UsersPermissionService } from './users-permission.service';

@Injectable()
export class AccessControlService {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly usersService: UsersService,
  ) {}
  async createPermission(permissions) {
    const createdPermissions = await Promise.all(
      permissions.map(async (item) => {
        const {
          can_approve,
          can_create,
          can_read,
          can_update,
          can_delete,
          phaseId,
          name,
        } = item;

        const permission = await this.permissionService.create({
          can_approve,
          can_create,
          can_read,
          can_update,
          can_delete,
          name,
        });

        return { ...permission, phaseId };
      }),
    );

    return createdPermissions;
  }

  async createUser({ name, email, password, departmentId }) {
    const user = await this.usersService.create({
      name,
      email,
      password,
      departmentId,
    });

    return user.id;
  }
}
