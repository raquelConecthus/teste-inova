import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  creator: string;

  @IsString()
  @ApiProperty()
  approver: string;

  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsString()
  @ApiProperty()
  productFamily: string;

  @IsString()
  @ApiProperty()
  finalGood: string;
}
