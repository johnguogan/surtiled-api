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
    const categoy = this.categoriesService.findOne(6)
    console.log("product add: ", createProductDto);
    createProductDto['categoryId'] = categoy;
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
  
  @Get('/featured')
  findFeaturedAll(): Promise<Product[]> {
    const products = this.productsService.featuredAll();
    return products;
  }

  // findFeaturedAll(@Res() res) {
  //   res.sendFile('948fc9e46db1bdbfd0e2b027e560fbdf', { root: './uploads'})
  //   // const products = this.productsService.featuredAll();
    
  //   // return products;
  // }

  @Get(':id')
  findProducts(@Param('id') id: number): Promise<Product[]> {
    const products = this.productsService.findGroup(id)
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
