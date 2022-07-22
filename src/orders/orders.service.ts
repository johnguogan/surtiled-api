import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { BankAccount } from './entity/bankaccount.entity';
import { CreateBankAccountDto } from './dto/create-bankaccount.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderList)
    private orderListRepository: Repository<OrderList>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    private usersService: UsersService,
  ) {}

  async create (createOrderDto: any) {
    const {products, ...order} = createOrderDto
    const user = await this.usersService.findOneById(order.userId)
    order['user'] = user
    order['deliveredAt'] = new Date()
    const insertedOrder = await this.orderRepository.save(order)
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
    const order = await this.orderRepository.findOne({
      relations: ['user'],
      where: {id},
      select: {
        user: {
          id: true,
          socketId: true,
          
        }
      }
    })

    const result = await this.orderListRepository.find({
      relations: ['product', 'order'],
      where: {order: {id}},
      select:{
        product: {
          name: true,
          price: true,
          imageName: true,
        },
      }
    });

    const order_list = []
    result.map(item => {
      let orderItem = {
        quantity: item.quantity,
        name: item.product.name,
        imageName: item.product.imageName,
        price: item.product.price
      }

      order_list.push(orderItem)
    })
    
    order['productList'] = order_list
    return order
  }

  async findOrderProducts(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user','orderList'],
      where: { delivered: false, type: 'product'},
      select: {
        id: true,
        user: {
          names: true,
          surnames: true,
        },
      }
    })
  }

  async findOrderServices(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user','orderList'],
      where: { delivered: false, type: 'service'},
      select: {
        id: true,
        user: {
          names: true,
          surnames: true,
        },
      }
    })
  }

  async update(id:number, data:any) {
    return await this.orderRepository.update({id}, data)
  }

  deliveryAction(id:number) {
    console.log("dilivery action: ", id)
    const data = { delivered: true, deliveredAt: new Date() }
    return this.orderRepository.update({id}, data)
  }

  acceptAction(id:number) {
    const data = { accepted: true }
    return this.orderRepository.update({id}, data)
  }

  receivedAction(id:number) {
    const data = { received: true,  }
    return this.orderRepository.update({id}, data)
  }

  getCompletedOrders(userid:number) {
    return this.orderRepository.find({
      where: {user: {id: userid}, delivered: true, received: false},
      select: {
        id: true,
        orderNumber: true,
        deliveredAt: true,
      }
    })
  }

  async generateOrderNumber(id: number) {
    // const user = await this.userRepository.findOne({where: {id}})
    // const user = await this.usersService.findOneById(id)
    const orderCount =  await this.orderRepository.count({where: {user:{id}}})
    // console.log("generateNumber user: ", user);
    
    console.log("generateOrderNumber: ", id, orderCount);
    return (new Date()).getFullYear() % 100 * 1000 + orderCount + 1 + id * 100000
  }

  async registerBankAccount(createBankAccountDto: CreateBankAccountDto) {
    createBankAccountDto['id'] = 1
    const list = await this.bankAccountRepository.find()
    if(list.length > 0)
      return await this.bankAccountRepository.update(1, createBankAccountDto)
    else
      return await this.bankAccountRepository.save(createBankAccountDto)
  }

  async getBankAccount(): Promise<CreateBankAccountDto[]> {
    const result = await this.bankAccountRepository.find();
    return result
  }

  // async getOrderedNumber() {
  //   const products = await this.orderRepository.find({where:{}})
  // }
}
