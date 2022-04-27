import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductsService {
constructor(@InjectModel(Products.name) private productsModel: Model<ProductsDocument>) {}

  async create (createProductDto: CreateProductDto): Promise<Products> {
    const createdProduct = new this.productsModel(createProductDto);
    return createdProduct.save();
  }

  async findOne(name: string): Promise<Products | undefined> {
    // this.productsModel.find().exec();
    // return this.productsModel.find(product => product.name === name);
    return;
  }

  async findAll(): Promise<Products[]>{
    return this.productsModel.find().exec();
  }
}
