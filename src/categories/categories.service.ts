import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoriesService {
constructor(@InjectModel(Categories.name) private ordersModel: Model<CategoriesDocument>) {}

  async create (createCategoryDto: CreateCategoryDto): Promise<Categories> {
    const createdCategorie = new this.ordersModel(createCategoryDto);
    return createdCategorie.save();
  }

  async findOne(name: string): Promise<Categories | undefined> {
    // this.ordersModel.find().exec();
    // return this.ordersModel.find(order => order.name === name);
    return;
  }

  async findAll(): Promise<Categories[]>{
    return this.ordersModel.find().exec();
  }
}
