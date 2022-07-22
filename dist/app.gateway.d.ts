import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from './users/users.service';
import { ChattingService } from './chatting/chatting.service';
import { OrdersService } from './orders/orders.service';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private usersService;
    private chattingService;
    private ordersService;
    server: Server;
    private logger;
    constructor(usersService: UsersService, chattingService: ChattingService, ordersService: OrdersService);
    handleConnect(client: Socket, payload: any): Promise<void>;
    handleMessage(client: Socket, payload: any): Promise<void>;
    handleOrderComplete(client: Socket, payload: any): Promise<void>;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): Promise<void>;
}
