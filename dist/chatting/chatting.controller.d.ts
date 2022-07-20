import { ChattingService } from './chatting.service';
export declare class ChattingController {
    private chattingService;
    constructor(chattingService: ChattingService);
    getChatUsers(userId: number): Promise<any[]>;
    getChatMessages(channelId: number): Promise<{
        id: number;
        senderId: number;
        message: string;
        createdAt: Date;
    }[]>;
    loginRequest(data: any): any;
    verifyRequest(data: any): {
        accessToken: string;
        user: {
            username: string;
            phoneNumber: string;
            email: string;
            createdAt: number;
            updatedAt: number;
            id: string;
            role: string;
        };
    };
    userGroupRequest(data: any): {
        status: boolean;
        data: {
            id: string;
            groupName: string;
            imgUrl: string;
            creatorName: string;
            unreadMessages: number;
            updatedAt: string;
        }[];
    };
    getGroupInfo(id: string, data: any): {
        status: boolean;
        data: {
            private: boolean;
            fee: number;
            updatedAt: string;
            groupName: string;
            id: string;
            imgUrl: string;
            everyonePost: boolean;
            members: {
                id: string;
                username: string;
                useravatar: string;
                nickname: string;
                role: string;
            }[];
        };
    };
    getChats(id: string): ({
        id: string;
        messageType: string;
        username: string;
        nickname: string;
        body: string;
        time: Date;
        imageUrl?: undefined;
    } | {
        id: string;
        messageType: string;
        username: string;
        nickname: string;
        body: string;
        imageUrl: string;
        time: Date;
    })[];
}
