import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsInt } from 'class-validator';

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
  @IsInt()
  @ApiProperty()
  creatorId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  approverId: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productFamily: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  finalGood: string;
}
