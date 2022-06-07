import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import Connection from 'mysql2/typings/mysql/lib/Connection';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderList)
    private orderListRepository: Repository<OrderList>
  ) {}

  async create (createOrderDto: CreateOrderDto) {
    const {products, ...order} = createOrderDto
    const insertedOrder = await this.orderRepository.save(order)
    console.log("insertedOrder: ", insertedOrder);
    
    products.length > 0 && products.map(item => {
      item['order'] = insertedOrder
      item['product'] = item
      this.orderListRepository.save(item);
      return item;
    })
  }

  async findOne(id: number): Promise<OrderList[] | undefined> {
    const order = await this.orderListRepository.find({where: {id}});
    return await this.orderListRepository.find({
      relations: ['product'],
      where: {order: order}
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderList'],
    })
  }

  async update(id:number, data:any) {
    return await this.orderRepository.update({id}, data)
  }

  async generateOrderNumber(id: number) {
    const orderCount =  await this.orderRepository.count({where: {userId: id}})
    console.log("generateOrderNumber: ", id, orderCount);
    
    return (new Date()).getFullYear() % 100 * 1000 + orderCount + 1 + id * 100000
  }
}
