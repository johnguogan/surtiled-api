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
  UploadedFile, 
  Req} from '@nestjs/common';
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

  @Get('/featured/product')
  findFeaturedProducts(): Promise<Product[]> {
    const products = this.productsService.featuredAll('product');
    return products;
  }

  @Get('/featured/service')
  findFeaturedServices(): Promise<Product[]> {
    const products = this.productsService.featuredAll('service');
    return products;
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

  @Get('/')
  findAll(): Promise<Product[]> {
    const products = this.productsService.findAll();
    return products;
  }
  
  @Post('filter')
  filteredProducts(@Body() filterList: any): Promise<any> {
    console.log("products/filter", filterList);
    
    return this.productsService.filterProductProducts(filterList)
  }

  @Get(':id')
  findProducts(@Param('id') id: number): Promise<any> {
    const products = this.productsService.findProducts(id)
    return products
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProduct): Promise<UpdateResult> {
    const product = this.productsService.update(id, updateProduct)
    return product
  }
  
  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: number) {
    this.productsService.remove(id)
    return {message: 'ok'}
  }

  @Get('services/:id')
  findServices(@Param('id') id: number): Promise<any> {
    console.log("products/services/:id");
    
    const products = this.productsService.findServices(id)
    return products
  }

  @Get('/item/:id')
  @Header('content-type', 'application/x-www-form-urlencoded')
  getProduct(@Param('id') id: number, @Req() request): Promise<Product> {
    console.log("param: ", id);
    console.log("body: ", request.query);
    const product = this.productsService.findProduct(id, request.query.userid)
    return product
  }
}
