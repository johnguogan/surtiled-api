import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Orders, OrdersDocument } from './schemas/orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';


@Injectable()
export class OrdersService {
constructor(@InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>) {}

  async create (createOrderDto: CreateOrderDto): Promise<Orders> {
    const createdOrder = new this.ordersModel(createOrderDto);
    return createdOrder.save();
  }

  async findOne(name: string): Promise<Orders | undefined> {
    // this.ordersModel.find().exec();
    // return this.ordersModel.find(order => order.name === name);
    return;
  }

  async findAll(): Promise<Orders[]>{
    return this.ordersModel.find().exec();
  }
}
