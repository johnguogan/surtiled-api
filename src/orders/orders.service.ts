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
    // const createdOrder = new this.orderRepository(createOrderDto);
    // return createdOrder.save();
    // return await this.orderRepository.save(createOrderDto)
    //   .then(res => res).catch(e => console.log(e));
  }

  async findOne(id: number): Promise<Order | undefined> {
    // this.orderRepository.find().exec();
    return this.orderRepository.findOne({where: {id}});
  }

  async findAll(): Promise<Order[]>{
    return this.orderRepository.find()
  }

  async update(id:number, data:any) {
    return await this.orderRepository.update({id}, data)
  }
}
