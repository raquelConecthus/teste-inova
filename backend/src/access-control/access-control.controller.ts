import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { AccessControlService } from './access-control.service';
import { PermissionService } from 'src/permission/permission.service';
import { UsersPermissionService } from './users-permission.service';

@Controller('access-control')
export class AccessControlController {
  constructor(
    private readonly accessControlService: AccessControlService,
    private readonly usersPermissionService: UsersPermissionService,
  ) {}
  @Post()
  async create(@Body() createAccessDto: CreateAccessDto) {
    const { permissions } = createAccessDto;
    const { name, email, password, departmentId } = createAccessDto;

    const createdPermissions =
      await this.accessControlService.createPermission(permissions);

    const userId = await this.accessControlService.createUser({
      name,
      email,
      password,
      departmentId,
    });

    await this.usersPermissionService.createUsersPermission(
      createdPermissions,
      userId,
    );
  }

  @Get('list')
  async listCredentials(@Query('page') page: number) {
    if (!page) page = 1;
    return await this.usersPermissionService.listCredentials(page);
  }
}
