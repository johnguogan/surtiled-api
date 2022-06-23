import { Entity, Column, PrimaryGeneratedColumn, Double, OneToMany, JoinColumn } from 'typeorm';
import { OrderList } from './orderlist.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @Column()
  idCard: string;
  
  @Column()
  email: string;
  
  @Column()
  homeDelivery: boolean;

  @Column()
  address: string;

  @Column({type: 'double'})
  latitude: number;
  
  @Column({type: 'double'})
  longitude: number;

  @Column()
  reference: string;

  @Column()
  type: string;

  @Column({default: false})
  received: boolean;
  
  @Column({default: false})
  delivered: boolean;

  @Column()
  orderedAt: Date;
  
  @Column()
  deliveredAt: Date;
  
  @OneToMany(() => OrderList, (orderList) => orderList.order)
  @JoinColumn()
  // @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  orderList: OrderList[];
}
