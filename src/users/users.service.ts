import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create (createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await this.usersRepository.save(data)
      // .then(res => res).catch(e => console.log(e));
  }

  async findOne(userid: string): Promise<User> {
    const result = await this.usersRepository.findOne({where: {userid}});
    return result
  }

  async findUsers(): Promise<User[]>{
    return await this.usersRepository.find();
  }

  async addUser(data: any) {
    return await this.usersRepository.save(data)
  }

  async updateUser(data: any): Promise<UpdateResult> {
    return await this.usersRepository.update(data.id, data)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
