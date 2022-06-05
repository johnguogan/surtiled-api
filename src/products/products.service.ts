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
    // this.productRepository.createQueryBuilder('product')
    //   .innerJoin('product.categoryId', 'category')
    return this.productRepository.find({
      relations: ['category'],
      // where: { category: {id: i}}
    });
  }

  async findGroup(id: number): Promise<Product[]>{
    // this.productRepository.createQueryBuilder('product')
    //   .innerJoin('product.categoryId', 'category')
    return this.productRepository.find({
      where: { categoryId: id }
    });
  }

  async featuredAll(): Promise<Product[]>{
    // this.productRepository.createQueryBuilder('product')
    //   .innerJoin('product.categoryId', 'category')
    return this.productRepository.find({
      where: { featured: true }
    });
  }

  async update(id: number, data: any) {
    return await this.productRepository.update({id}, data)
  }

  async remove(id: number) {
    await this.productRepository.delete({id})
  }
}
