import { Body, Controller, Get, Post, Req, UseGuards, Header } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/add')
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    const order = this.ordersService.create(createOrderDto)
    return order;
  }

  @Get('/')
  findAll(): Promise<Order[]> {
    const orders = this.ordersService.findAll();
    return orders;
  }
}
