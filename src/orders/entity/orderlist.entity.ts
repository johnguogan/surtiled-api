import { Product } from 'src/products/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.orderList)
  product: Product;
  // @Column()
  // productId: number;

  @Column()
  quantity: number;
  
  @ManyToOne(() => Order, (order) =>order.orderList , { eager: false, onDelete: 'CASCADE' })
  // @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  order: Order;
}
