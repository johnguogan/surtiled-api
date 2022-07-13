import { Category } from 'src/categories/entity/category.entity';
import { OrderList } from 'src/orders/entity/orderlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';

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

  @Column()
  type: string;

  @Column({default: 0})
  score: number;

  @Column({default: 0})
  reviewNumber: number;

  @Column({default: true})
  active: boolean;

  @Column()
  createdAt: Date;
  
  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
  // @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  @JoinColumn()
  category: Category;

  @OneToMany(() => OrderList, (orderList) => orderList.product, { onDelete: 'CASCADE' })
  orderList: OrderList[];
}
