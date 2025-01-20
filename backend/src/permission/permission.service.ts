import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPermissionDto: CreatePermissionDto) {
    console.log('This action adds a new permission');

    const createdPermission = await this.prisma.permission.create({
      data: createPermissionDto,
    });
    return createdPermission;
  }

  async findAll(page) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    return await this.prisma.permission.findMany({
      skip,
      take: pageSize,
    });
  }

  async findOne(id: number) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    return permission;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
