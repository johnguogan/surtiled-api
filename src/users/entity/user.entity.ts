import { Channel } from 'src/chatting/entity/channels.entity';
import { Order } from 'src/orders/entity/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column({nullable: true})
  imageName: string;

  @Column()
  names: string;

  @Column({nullable: true})
  surnames: string;

  @Column({nullable: true})
  imageLink: string;
  
  @Column({nullable: true})
  typeId: string;
  
  @Column({nullable: true})
  idNumber?: string;

  @Column({nullable: true})
  cell: string;

  @Column({nullable: true})
  conventional: string;

  @Column({nullable: true})
  residence: string;

  @Column({nullable: true})
  email: string;
  
  @Column({nullable: true})
  password: string;

  @Column()
  role: string;

  @Column({default: ''})
  socketId: string;

  @Column({type:"datetime", nullable: true})
  createdAt?:  Date;

  @Column({type:"datetime", nullable: true})
  updatedAt?:  Date;

  @Column({nullable: true})
  access_token: string;

  @OneToMany(() => Order, order => order.user)
  order: Order[]

  @OneToMany(() => Channel, channel => channel.user1)
  user1: Channel[]

  @OneToMany(() => Channel, channel => channel.user2)
  user2: Channel[]
}