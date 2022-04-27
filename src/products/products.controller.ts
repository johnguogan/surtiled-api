import { Body, Controller, Get, Post, Req, UseGuards, Header } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './schemas/products.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/register')
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto): Promise<Products> {
    const product = this.productsService.create(createProductDto)
    return product;
  }

  @Get('/list')
  findAll(): Promise<Products[]> {
    const products = this.productsService.findAll();
    return products;
  }
}
