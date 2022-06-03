import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create (createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto)
      .then(res => res).catch(e => console.log(e));
  }

  async findOne(userid: string): Promise<User> {
    return await this.usersRepository.findOne({where: {userid}});
  }

  findAll(): Promise<User[]>{
    return this.usersRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
