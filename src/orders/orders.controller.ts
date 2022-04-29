import { Body, Controller, Get, Post, Req, UseGuards, Header } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './schemas/orders.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/register')
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto): Promise<Orders> {
    const order = this.ordersService.create(createOrderDto)
    return order;
  }

  @Get('/list')
  findAll(): Promise<Orders[]> {
    const orders = this.ordersService.findAll();
    return orders;
  }
}
