import { Product } from 'src/products/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  // @OneToOne(() => Product, (product) => product.id)
  // product: string;
  @Column()
  productId: number;

  @Column()
  quantity: number;
  
  // @ManyToOne(() => Category, (category) => category.products, { eager: false, onDelete: 'CASCADE' })
  // // @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  // category: Category[];
}
