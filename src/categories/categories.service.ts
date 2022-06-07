import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Category } from './entity/category.entity';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  async create (createCategoryDto: CreateCategoryDto) {
    // const createdCategorie = new this.categoriesRepository(createCategoryDto);
    return await this.categoriesRepository.save(createCategoryDto).then(res => res).catch(e => console.log(e));
  }

  async findOne(id: number): Promise<Category | undefined> {
    // this.categoriesRepository.find().exec();
    return await this.categoriesRepository.findOne({where: {id}});
  }

  async findCategories(): Promise<Category[]>{
    return this.categoriesRepository.find({where: {categoryId: LessThan(10)}});
  }
  
  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id)
  }
}
