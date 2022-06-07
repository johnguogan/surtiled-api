import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {}

  async create (createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto)
  }

  async findOne(id: number): Promise<Order | undefined> {
    // this.orderRepository.find().exec();
    return await this.orderRepository.findOne({where: {id}});
  }

  async findAll(): Promise<Order[]>{
    return this.orderRepository.find()
  }

  async update(id:number, data:any) {
    return await this.orderRepository.update({id}, data)
  }

  async generateOrderNumber(id: number) {
    const orderCount =  await this.orderRepository.count({where: {userId: id}})
    return (new Date()).getFullYear() % 100 * 1000 + orderCount + 1 + id * 100000
  }
}
