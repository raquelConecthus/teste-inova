import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { Users } from './users/entities/user.entity';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('me')
  getMe(@CurrentUser() user: Users) {
    return user;
  }
  @IsPublic()
  @Get('')
  getHello() {
    return 'Hello from Teste Inova';
  }

  @Post('welcome-email')
  async sendWelcomeEmail(@Body() body: { email: string; username: string }) {
    const { email, username } = body;
    await this.appService.sendWelcomeEmail(email, username);
    return { message: 'Welcome email sent successfully!' };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully', file };
  }
}
