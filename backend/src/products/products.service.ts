import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    console.log('This action adds a new product');
    const product = this.prisma.product.create({ data: createProductDto });
    return product;
  }

  async findAll() {
    console.log(`This action returns all products`);
    try {
      const products = await this.prisma.product.findMany();
      if (!products || products.length === 0) {
        throw new InternalServerErrorException('No products found');
      }
      return products;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  async findOne(id: number) {
    console.log(`This action returns a #${id} product`);
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) return null;
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log(`This action updates a #${id} product`);
    const product = await this.findOne(id);
    if (!product) return null;
    const updateUser = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return updateUser;
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} product`);
    const product = await this.findOne(id);
    if (!product) return null;
    return this.prisma.product.delete({ where: { id } });
  }
}
