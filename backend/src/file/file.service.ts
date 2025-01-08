import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class FileService {
  readExcel(filePath: string): any[] {
    // Lê o arquivo Excel
    const workbook = XLSX.readFile(filePath);

    // Seleciona a primeira planilha
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Converte os dados para JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data; // Retorna os dados como um array de objetos
  }
}
