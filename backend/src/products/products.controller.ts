import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @IsPublic()
  @Get()
  async findAll(@Query() query) {
    try {
      const { page, limit } = query;
      const pageInt = parseInt(page) || 1;
      const limitInt = parseInt(limit) || 10;

      return await this.productsService.findAll(pageInt, limitInt);
    } catch (error) {
      console.error('Controller error:', error.message);
      throw new InternalServerErrorException('Could not retrieve products');
    }
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Product ID', example: 1 })
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, updateProductDto);
    if (!product) throw new NotFoundException();
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const product = await this.productsService.remove(id);
    if (!product) throw new NotFoundException();
    return {
      message: 'Product removed!',
    };
  }
}
