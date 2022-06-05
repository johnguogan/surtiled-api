import { Product } from 'src/products/entity/product.entity';
// import { SubCategory } from 'src/subcategories/entity/subcategory.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToOne(type => Product, (product) => product.category)
  @JoinColumn()
  products: Product;

  // @OneToOne(type => SubCategory, (subcategory) => subcategory.category)
  // subcategory: SubCategory
}
