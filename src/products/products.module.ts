import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from 'src/categories/categoies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
