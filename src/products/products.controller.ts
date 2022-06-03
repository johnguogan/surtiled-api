import { Body, Controller, Get, Post, UseGuards, Header, Delete, Param, Res, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/add')
  @Header('content-type', 'multipart/form-data')
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    // createProductDto.categoryId = parseInt(createProductDto.categoryId.toString())
    console.log("product add: ", createProductDto);
    // const product = this.productsService.create(createProductDto)
    // return product;
    return createProductDto;
  }
  
  @Get('/')
  findAll(): Promise<Product[]> {
    const products = this.productsService.findAll();
    return products;
  }

  @Get(':id')
  findProduct(@Param('id') id: number): Promise<Product[]> {
    const products = this.productsService.findGroup(id)
    return products
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProduct): Promise<UpdateResult> {
    const product = this.productsService.update(id, updateProduct)
    return product
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: number) {
    this.productsService.remove(id)
    return {message: 'ok'}
  }
}
