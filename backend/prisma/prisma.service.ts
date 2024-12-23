import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Failed to connect to the database', error);
      // Trate o erro de forma personalizada, como enviando logs para um serviço externo
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
