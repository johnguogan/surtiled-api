import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { Products, ProductsDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async create (createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto)
      .then(res => res).catch(e => console.log(e));
  }

  async findOne(id: number): Promise<Product | undefined> {
    return await this.productRepository.findOne({where: {id}});
  }

  async findAll(): Promise<Product[]>{
    return this.productRepository.find();
  }
}
