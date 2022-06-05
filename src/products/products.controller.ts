import { Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Header,
  Delete,
  Param,
  Res,
  Put,
  UseInterceptors,
  UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/add')
  // @Header('content-type', 'multipart/form-data')
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    // createProductDto.categoryId = parseInt(createProductDto.categoryId.toString())
    console.log("product add: ", createProductDto);
    const product = this.productsService.create(createProductDto)
    return product;
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('photo', {dest: './uploads'}))
  uploadImage(@UploadedFile() file) {
    console.log('request: ',file);
    return {path: file.filename}  
  }
  
  @Get('/')
  findAll(): Promise<Product[]> {
    const products = this.productsService.findAll();
    return products;
  }
  
  @Get('/featured')
  findFeaturedAll(): Promise<Product[]> {
    const products = this.productsService.featuredAll();
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
