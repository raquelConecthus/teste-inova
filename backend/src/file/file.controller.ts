import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import * as path from 'path';
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Diretório para salvar o arquivo
        filename: (req, file, callback) => {
          const uniqueName = `${file.originalname}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = path.join('./uploads', file.filename);

    // Lê os dados do Excel
    const data = this.fileService.readExcel(filePath);

    // Retorna os dados para visualização ou os armazena no banco
    return { message: 'File processed successfully', data };
  }
}
