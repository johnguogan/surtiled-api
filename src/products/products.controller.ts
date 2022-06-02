import { Body, Controller, Get, Post, Req, UseGuards, Header } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/add')
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    console.log("cretea product: ", createProductDto);
    
    const product = this.productsService.create(createProductDto)
    return product;
  }

  @Get('/list')
  findAll(): Promise<Product[]> {
    const products = this.productsService.findAll();
    return products;
  }
}
