import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column()
  names: string;

  @Column()
  surnames: string;
  
  @Column()
  typeId: string;
  
  @Column()
  idNumber: number;

  @Column()
  cell: number;

  @Column()
  conventional: string;

  @Column()
  residence: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: null, type:"datetime"})
  created_at?:  Date;

  @Column({ default: null, type:"datetime"})
  updated_at?:  Date;

  // @OneToMany(() => Book, book => book.user)
  //   books?: Book[];
}