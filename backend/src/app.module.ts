import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from 'prisma/prisma.module';
import { MailModule } from './email/email.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './file/file.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    MailModule,
    ProductsModule,
    MulterModule.register({
      dest: './uploads', // Diretório onde os arquivos serão salvos
    }),
    FileModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
