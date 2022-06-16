import { User } from "src/users/entity/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(type => User, (user) => user)

  @Column()
  name: string;

  @Column()
  userId: number;
}
