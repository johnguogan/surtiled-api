import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt'
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

  async findOneById(id: number): Promise<User> {
    const result = await this.usersRepository.findOne({where: {id}});
    return result
  }

  async findOneByToken(access_token: string): Promise<User> {
    const result = await this.usersRepository.findOne({where: {access_token}});
    return result
  }

  async findUsers(): Promise<User[]>{
    return await this.usersRepository.find();
  }

  async addUser(data: any) {
    data['password'] = await bcrypt.hash(data['password'], 10)
    data['createdAt'] = new Date()
    return await this.usersRepository.save(data)
  }

  async updateUser(data: any): Promise<UpdateResult> {
    data['password'] = await bcrypt.hash(data['password'], 10)
    data['updatedAt'] = new Date()
    return await this.usersRepository.update(data.id, data)
  }

  async removeUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }

  async updateUserToken(id, access_token): Promise<UpdateResult> {
    return await this.usersRepository.update(id, {access_token})
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async getUserByRole(role: string): Promise<User[]> {
    const result = await this.usersRepository.find({
      where: {role},
      select: {
        id: true,
        names: true,
        surnames: true,
        imageLink: true,  
        role: true,
        socketId: true,
      }
    });
    return result
  }

  async disableUserSocket(socketId: string) {
    const user = await this.usersRepository.findOne({where: {socketId}})

    let result: any;
    if(user)
      result = await this.usersRepository.update(user.id, { socketId: ''})
    return user
  }
}
