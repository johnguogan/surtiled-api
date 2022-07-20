import { Channel } from 'src/chatting/entity/channels.entity';
import { Order } from 'src/orders/entity/order.entity';
export declare class User {
    id: number;
    userid: string;
    imageName: string;
    names: string;
    surnames: string;
    imageLink: string;
    typeId: string;
    idNumber?: string;
    cell: string;
    conventional: string;
    residence: string;
    email: string;
    password: string;
    role: string;
    socketId: string;
    createdAt?: Date;
    updatedAt?: Date;
    access_token: string;
    order: Order[];
    user1: Channel[];
    user2: Channel[];
}
