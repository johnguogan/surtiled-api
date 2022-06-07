import { Body, Controller, Get, Post, Req, UseGuards, Header } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/add')
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const categorie = this.categoriesService.create(createCategoryDto)
    return categorie;
  }
  
  @Get()
  findAll(): Promise<Category[]> {
    const categories = this.categoriesService.findCategories();
    return categories;
  }
}
