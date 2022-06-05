import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  idCard: string;
  
  @Column()
  email: string;
  
  @Column()
  homeDelivery: boolean;

  @Column()
  address: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  reference: string;
  
  // @ManyToOne(() => Category, (category) => category.products, { eager: false, onDelete: 'CASCADE' })
  // // @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
  // category: Category[];
}
