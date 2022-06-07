import { Entity, Column, PrimaryGeneratedColumn, Double } from 'typeorm';

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

  @Column({type: 'float'})
  latitude: number;
  
  @Column({type: 'float'})
  longitude: number;

  @Column()
  reference: string;

  @Column({default: false})
  received: boolean;
  
  @Column({default: false})
  delivered: boolean;

  @Column()
  orderedAt: Date;
  
  @Column()
  deliveredAt: Date;
  
  // @ManyToOne(() => Category, (category) => category.products, { eager: false, onDelete: 'CASCADE' })
  // // @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  // category: Category[];
}
