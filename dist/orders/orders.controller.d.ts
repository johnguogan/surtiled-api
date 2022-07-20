import { CreateBankAccountDto } from './dto/create-bankaccount.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    findOrderProducts(): Promise<Order[]>;
    findOrderServices(): Promise<Order[]>;
    getOrderedNumber(): Promise<{
        products: number;
        services: number;
    }>;
    getOrder(id: number): Promise<OrderList[]>;
    getOrderNumber(id: number): Promise<number>;
    create(createOrderDto: CreateOrderDto): boolean;
    deliveryAction(id: number): Promise<import("typeorm").UpdateResult>;
    registerBankAccount(data: CreateBankAccountDto): Promise<import("typeorm").UpdateResult | (CreateBankAccountDto & import("./entity/bankaccount.entity").BankAccount)>;
    getBankAccount(): Promise<any>;
}
