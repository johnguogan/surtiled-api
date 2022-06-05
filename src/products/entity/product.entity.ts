import { Category } from 'src/categories/entity/category.entity';
import internal from 'stream';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

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

  @Column()
  imageName: string;
  
  @Column()
  price: number;
  
  @Column()
  balance: number;

  @Column()
  color: string;
  
  @Column()
  featured: boolean;

  // @Column()
  // review: number;

  // @Column()
  // reviewNumber: number;
  
  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, { eager: false, onDelete: 'CASCADE' })
  // @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  @JoinColumn()
  category: Category;
}
