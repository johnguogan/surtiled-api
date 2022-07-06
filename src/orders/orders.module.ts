import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import { BankAccount } from './entity/bankaccount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderList, BankAccount])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
