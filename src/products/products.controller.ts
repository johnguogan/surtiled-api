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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  @Post('/add')
  // @Header('content-type', 'multipart/form-data')
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    // createProductDto.categoryId = parseInt(createProductDto.categoryId.toString())
    const category = this.categoriesService.findOne(createProductDto.category)
    console.log("product add: ", createProductDto);

    const productInfo = createProductDto;
    productInfo['categoryId'] = category;
    const product = this.productsService.create(createProductDto)
    return product;
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor(
    'photo',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  ))
  uploadImage(@UploadedFile() file) {
    console.log('request: ',file);
    return {path: file.filename}  
  }
  
  @Get('/')
  findAll(): Promise<Product[]> {
    const products = this.productsService.findAll();
    return products;
  }
  
  @Get('/featured/products')
  findFeaturedProducts(): Promise<Product[]> {
    const products = this.productsService.featuredAll('product');
    return products;
  }

  @Get('/featured/services')
  findFeaturedServices(): Promise<Product[]> {
    const products = this.productsService.featuredAll('service');
    return products;
  }

  @Get(':id')
  findProducts(@Param('id') id: number): Promise<any> {
    const products = this.productsService.findProducts(id)
    return products
  }

  @Get('services/:id')
  findServices(@Param('id') id: number): Promise<any> {
    const products = this.productsService.findServices(id)
    return products
  }

  @Get('/item/:id')
  getProduct(@Param('id') id: number): Promise<Product[]> {
    const products = this.productsService.findProduct(id)
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
