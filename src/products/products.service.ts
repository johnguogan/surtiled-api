import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { Products, ProductsDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entity/category.entity';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private favoriteService: FavoritesService
  ) {}

  async create (createProductDto: any) {
    createProductDto['createdAt'] = new Date()
    return await this.productRepository.save(createProductDto)
      // .then(res => res).catch(e => console.log(e));
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
      where: {id},
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

  async filterProductProducts(filtterList: any) {
    const { category, lookfor, max, min} = filtterList
    let productList: any = [];
    let result: any = []

    switch(lookfor) {
      case 'popular':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}},
          order: {'score': 'DESC'}
        })
        break;
      case 'new':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}},
          order: {'createdAt': 'DESC'}
        })
        break;
      case 'old':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}},
          order: {'createdAt': 'ASC'}
        })
        break;
      case 'higher':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}},
          order: {'price': 'DESC'}
        })
        break;
      case 'lower':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}},
          order: {'price': 'ASC'}
        })
        break;
      default:
        break;
    }

    result = productList
    if(min > 0)
      result = productList.filter((item: any) => item.price > min)
    if(max > 0)
      result = result.filter((item: any) => item.price < max)
    
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

  async findProduct(id: number, userid: number): Promise<any>{
    const product = await this.productRepository.findOne({
      // relations: ['review'],
      where: { id }
    });
    product['favorite'] = await this.favoriteService.getFavorite({productid: id, userid})

    return product
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

  remove(id: number) {
    return this.productRepository.delete({id})
  }
}
