import { Body, Controller, Get, Post, Req, UseGuards, Header, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  findAll(): Promise<Order[]> {
    const orders = this.ordersService.findAll();
    return orders;
  }

  @Get(':id')
  getOrder(@Param('id') id: number): Promise<OrderList[]> {
    const orders = this.ordersService.findOne(id);
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
    this.ordersService.create(createOrderDto)
    return true;
  }

  @Post('delivery/:id')
  deliveryAction(@Param('id') id: number) {
    return this.ordersService.deliveryAction(id)
  }
}
