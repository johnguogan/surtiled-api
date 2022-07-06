import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { BankAccount } from './entity/bankaccount.entity';
import { CreateBankAccountDto } from './dto/create-bankaccount.dto';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderList)
    private orderListRepository: Repository<OrderList>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>
  ) {}

  async create (createOrderDto: any) {
    const {products, ...order} = createOrderDto
    const insertedOrder = await this.orderRepository.save(order)
    console.log("insertedOrder: ", insertedOrder);
    console.log("insertedOrder order: ", order);
    
    products.length > 0 && products.map(item => {
      item['order'] = insertedOrder.id
      item['product'] = item.id
      item['id'] = 0
      this.orderListRepository.save(item);
      return item;
    })
  }

  async findOne(id: number): Promise<any | undefined> {
    const result = await this.orderListRepository.find({
      relations: ['product', 'order'],
      where: {order: {id}}
    });

    const order_list = []
    result.map(item => {
      let order = {
        quantity: item.quantity,
        product: item.product
      }
        order_list.push(order)
    })
    
    return order_list
  }

  async findOrderProducts(): Promise<Order[]> {
    return this.orderRepository.find({
      // relations: ['orderList'],
      where: { delivered: false, type: 'product'}
    })
  }

  async findOrderServices(): Promise<Order[]> {
    return this.orderRepository.find({
      // relations: ['orderList'],
      where: { delivered: false, type: 'service'}
    })
  }

  async update(id:number, data:any) {
    return await this.orderRepository.update({id}, data)
  }

  async deliveryAction(id:number) {
    const data = { delivered: true }
    return await this.orderRepository.update({id}, data)
  }

  async generateOrderNumber(id: number) {
    const orderCount =  await this.orderRepository.count({where: {userId: id}})
    console.log("generateOrderNumber: ", id, orderCount);
    
    return (new Date()).getFullYear() % 100 * 1000 + orderCount + 1 + id * 100000
  }

  async registerBankAccount(createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountRepository.save(createBankAccountDto)
  }

  async getBankAccount(): Promise<CreateBankAccountDto[]> {
    const result = await this.bankAccountRepository.find();
    console.log("service: ", result);
    
    return result
  }
}
