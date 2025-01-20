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
  async listCredentials(page: number) {
    const pageSize = 5; // Itens por página
    const skip = (page - 1) * pageSize;

    const userRoles = await this.prisma.user_Roles.findMany({
      skip: skip,
      take: pageSize,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        permission: {
          select: {
            can_create: true,
            can_read: true,
            can_update: true,
            can_delete: true,
            can_approve: true,
          },
        },
        phase: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const totalRecords = await this.prisma.user_Roles.count();
    const totalPages = Math.ceil(totalRecords / pageSize);

    return {
      data: userRoles,
      meta: {
        currentPage: page,
        totalPages,
        totalRecords,
        pageSize,
      },
    };
  }
}
