import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        user: {
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
            role: string;
            socketId: string;
            createdAt?: Date;
            updatedAt?: Date;
            access_token: string;
            order: import("../orders/entity/order.entity").Order[];
            user1: import("../chatting/entity/channels.entity").Channel[];
            user2: import("../chatting/entity/channels.entity").Channel[];
        };
        access_token: string;
        state?: undefined;
    } | {
        state: string;
        user?: undefined;
        access_token?: undefined;
    }>;
    loginByToken(req: any): Promise<false | {
        user: {
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
            role: string;
            socketId: string;
            createdAt?: Date;
            updatedAt?: Date;
            access_token: string;
            order: import("../orders/entity/order.entity").Order[];
            user1: import("../chatting/entity/channels.entity").Channel[];
            user2: import("../chatting/entity/channels.entity").Channel[];
        };
        access_token: string;
    }>;
    register(req: any): Promise<false | {
        createdAt: Date;
        updatedAt: Date;
        userid: string;
        imageName: string;
        names: string;
        surnames: string;
        typeId: string;
        idNumber?: string;
        cell: string;
        conventional: string;
        residence: string;
        email: string;
        role: string;
        id: number;
        imageLink: string;
        socketId: string;
        access_token: string;
        order: import("../orders/entity/order.entity").Order[];
        user1: import("../chatting/entity/channels.entity").Channel[];
        user2: import("../chatting/entity/channels.entity").Channel[];
    }>;
    getProfile(req: any): any;
}
