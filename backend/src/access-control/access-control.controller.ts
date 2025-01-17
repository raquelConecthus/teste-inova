import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { AccessControlService } from './access-control.service';
import { PermissionService } from 'src/permission/permission.service';

@Controller('access-control')
export class AccessControlController {
  constructor(
    private readonly usersService: UsersService,
    private readonly accessControlService: AccessControlService,
    private readonly permissionService: PermissionService,
  ) {}
  @Post()
  async create(@Body() createAccessDto: CreateAccessDto) {
    const { name, email, password, departmentId } = createAccessDto;
    const { permissions } = createAccessDto;

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
    });
    console.log('permission');

    // const user = await this.usersService.create({
    //   name,
    //   email,
    //   password,
    //   departmentId,
    // });

    // console.log(user);
  }
}
