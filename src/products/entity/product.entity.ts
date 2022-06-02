import { Category } from 'src/categories/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: number;
  // @Column()
  // characteristic: string;

  // @Column()
  // imageUrl: string;

  
  // @Column()
  // lookfor: string;
  
  @Column()
  price: number;
  
  @Column()
  balance: number;
  
  @Column()
  featured: boolean;

  // @Column()
  // review: number;

  // @Column()
  // reviewNumber: number;
  
  // @Column()
  // relatedKey: string[];
  
  // @ManyToOne(() => Category, (category) => category.label)
  // category: Category[];
}
