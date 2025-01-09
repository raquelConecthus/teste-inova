import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class FileService {
  readExcel(filePath: string) {
    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: false,
    });

    const headerIndex = 5;
    const headers: any = jsonData[headerIndex];
    const dataRows = jsonData.slice(headerIndex + 1);

    const processedData = dataRows.map((row) => {
      const rowObject: any = {};
      headers.forEach((header, index) => {
        const value = row[index];
        if (value !== null && value !== undefined && value !== '') {
          rowObject[header] = value;
        }
      });
      return rowObject;
    });

    return processedData.filter((row) => Object.keys(row).length > 0);
  }
}
