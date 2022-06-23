import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { Products, ProductsDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entity/category.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create (createProductDto: any) {
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

  async findProducts(id: number): Promise<any>{
    // return this.productRepository.find({
    //   relations: ['category'],
    //   where: { category: {categoryId: id} }
    // });
    const result = this.categoryRepository.findOne({
      relations: ['products'],
      where: {id}
    })
    .then((res) => {
      res.products = res.products.filter(item => item.type === 'product')
      return res
    })
    .catch(err => {
      console.log("findServices Error!");
    })
    return result
  }

  async findServices(id: number): Promise<any>{
    const result = this.categoryRepository.findOne({
      relations: ['products'],
      where: {id}
    })
    .then((res) => {
      res.products = res.products.filter(item => item.type === 'service')
      return res
    })
    .catch(err => {
      console.log("findServices Error!");
    })
    return result
  }

  async findProduct(id: number): Promise<any>{
    return this.productRepository.find({
      // relations: ['review'],
      where: { id }
    });
  }

  async featuredAll(type): Promise<Product[]>{
    // this.productRepository.createQueryBuilder('product')
    //   .innerJoin('product.categoryId', 'category')
    return this.productRepository.find({
      where: { featured: true, type }
    });
  }

  async update(id: number, data: any) {
    return await this.productRepository.update({id}, data)
  }

  async remove(id: number) {
    await this.productRepository.delete({id})
  }
}
