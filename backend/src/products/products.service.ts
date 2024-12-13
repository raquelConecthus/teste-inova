import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    console.log('This action adds a new product');
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll() {
    console.log(`This action returns all products`);
    try {
      const products = await this.productRepository.find();
      if (!products || products.length === 0) {
        throw new InternalServerErrorException('No products found');
      }
      return products;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  async findOne(id: string) {
    console.log(`This action returns a #${id} product`);
    const product = await this.productRepository.findOneBy({ id });
    if (!product) return null;
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    console.log(`This action updates a #${id} product`);
    const product = await this.findOne(id);
    if (!product) return null;
    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} product`);
    const product = await this.findOne(id);
    if (!product) return null;
    return this.productRepository.remove(product);
  }
}
