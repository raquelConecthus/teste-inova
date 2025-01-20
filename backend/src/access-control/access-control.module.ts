import { Module } from '@nestjs/common';
import { AccessControlController } from './access-control.controller';
import { AccessControlService } from './access-control.service';
import { UsersModule } from 'src/users/users.module';
import { PermissionModule } from 'src/permission/permission.module';
import { UsersPermissionService } from './users-permission.service';

@Module({
  imports: [UsersModule, PermissionModule],
  controllers: [AccessControlController],
  providers: [AccessControlService, UsersPermissionService],
  exports: [AccessControlService],
})
export class AccessControlModule {}
