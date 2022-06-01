import { Body, Controller, Get, Post, Req, UseGuards, Header } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './schemas/categories.schema';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/register')
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories> {
    const categorie = this.categoriesService.create(createCategoryDto)
    return categorie;
  }

  @Get('/list')
  findAll(): Promise<Categories[]> {
    const categories = this.categoriesService.findAll();
    return categories;
  }
}
