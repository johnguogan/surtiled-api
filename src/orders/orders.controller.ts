import { Body, Controller, Get, Post, Req, UseGuards, Header, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  findAll(): Promise<Order[]> {
    const orders = this.ordersService.findAll();
    return orders;
  }
  
  @Get('orderNumber/:id')
  getOrderNumber(@Param('id') id: number): Promise<number> {
    return this.ordersService.generateOrderNumber(id)
  }
  
  @Post('add')
  @Header('content-type', 'application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log("order add request: ", createOrderDto);
    
    const order = this.ordersService.create(createOrderDto)
    return order;
  }
}
