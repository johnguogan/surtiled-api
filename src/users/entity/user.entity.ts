import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  surnames?: string;
  
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

  @Column({  type:"datetime"})
  created_at?:  Date;

  @Column({  type:"datetime"})
  updated_at?:  Date;

  // @OneToMany(() => Book, book => book.user)
  //   books?: Book[];
}