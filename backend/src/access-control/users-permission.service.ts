import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersPermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async createUsersPermission(permissions: any[], userId: number) {
    if (!permissions || permissions.length === 0) {
      throw new Error('No permissions provided');
    }

    for (const item of permissions) {
      if (!item.phaseId) {
        throw new Error(
          'Invalid permission data: permissionId or phaseId is missing',
        );
      }

      const data = {
        userId,
        permissionId: item.id,
        phaseId: item.phaseId,
      };

      await this.prisma.user_Roles.create({ data });
    }
  }
}
