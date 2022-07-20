"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattingController = void 0;
const common_1 = require("@nestjs/common");
const chatting_service_1 = require("./chatting.service");
let ChattingController = class ChattingController {
    constructor(chattingService) {
        this.chattingService = chattingService;
    }
    getChatUsers(userId) {
        console.log("getChatUsers: ", userId);
        const users = this.chattingService.getUsers(userId);
        return users;
    }
    getChatMessages(channelId) {
        console.log("getChatMessages: ", channelId);
        const messages = this.chattingService.getMessages(channelId);
        return messages;
    }
    loginRequest(data) {
        console.log("loginInfo: ", data);
        return data;
    }
    verifyRequest(data) {
        console.log("verify code: ", data);
        const response = {
            accessToken: "accessToken---test",
            user: {
                "username": "user1",
                "phoneNumber": "12267414450",
                "email": "user1@gmail.com",
                "createdAt": 1656807792824,
                "updatedAt": 1656807792824,
                "id": "6de13332-7cce-4ae1-9ff1-b783407993b3",
                "role": "client"
            }
        };
        return response;
    }
    userGroupRequest(data) {
        console.log("verify code: ", data);
        const response = {
            "status": true,
            "data": [
                {
                    "id": "5cab4ab33-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group1",
                    "imgUrl": "group1_img_url",
                    "creatorName": "user1",
                    "unreadMessages": 0,
                    "updatedAt": "2022-07-03T12:48:05.385Z"
                },
                {
                    "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group2",
                    "imgUrl": "group2_img_url",
                    "creatorName": "user1",
                    "unreadMessages": 2,
                    "updatedAt": "2022-07-03T12:43:55.240Z"
                },
                {
                    "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group3",
                    "imgUrl": "group3_img_url",
                    "creatorName": "user1",
                    "unreadMessages": 0,
                    "updatedAt": "2022-07-03T12:44:25.240Z"
                }, {
                    "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group4",
                    "imgUrl": "group4_img_url",
                    "creatorName": "user1",
                    "unreadMessages": 3,
                    "updatedAt": "2022-07-03T12:43:15.240Z"
                },
                {
                    "id": "5cab4ab31-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group5",
                    "imgUrl": "group5_img_url",
                    "creatorName": "user2",
                    "unreadMessages": 1,
                    "updatedAt": "2022-07-03T12:46:25.385Z"
                },
                {
                    "id": "5cab4ab34-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group6",
                    "imgUrl": "group6_img_url",
                    "creatorName": "user2",
                    "unreadMessages": 0,
                    "updatedAt": "2022-07-03T12:56:59.240Z"
                },
                {
                    "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group7",
                    "imgUrl": "group7_img_url",
                    "creatorName": "user2",
                    "unreadMessages": 3,
                    "updatedAt": "2022-07-03T12:48:55.240Z"
                }, {
                    "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group8",
                    "imgUrl": "group8_img_url",
                    "creatorName": "user2",
                    "unreadMessages": 0,
                    "updatedAt": "2022-07-03T12:47:55.240Z"
                },
                {
                    "id": "5cab4ab34-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group9",
                    "imgUrl": "group9_img_url",
                    "creatorName": "user3",
                    "unreadMessages": 2,
                    "updatedAt": "2022-07-03T12:56:59.240Z"
                },
                {
                    "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group10",
                    "imgUrl": "group10_img_url",
                    "creatorName": "user3",
                    "unreadMessages": 0,
                    "updatedAt": "2022-07-03T12:48:55.240Z"
                }, {
                    "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
                    "groupName": "group11",
                    "imgUrl": "group11_img_url",
                    "creatorName": "user3",
                    "unreadMessages": 1,
                    "updatedAt": "2022-07-03T12:47:55.240Z"
                },
            ]
        };
        return response;
    }
    getGroupInfo(id, data) {
        console.log("groupId: ", id, " userId: ", data.userId);
        const response = {
            "status": true,
            "data": {
                "private": true,
                "fee": 10,
                "updatedAt": "2022-06-17T13:27:37.233Z",
                "groupName": "group2",
                "id": "405a7dbf-3326-4777-a823-758f6f89558b",
                "imgUrl": "group2_img_url",
                "everyonePost": true,
                "members": [
                    { id: "user1-id", username: "username1", useravatar: "uesravatar1", nickname: "nickname1", role: "client" },
                    { id: "user2-id", username: "username2", useravatar: "uesravatar2", nickname: "nickname2", role: "client" },
                    { id: "user3-id", username: "username3", useravatar: "uesravatar3", nickname: "nickname3", role: "client" },
                    { id: "user4-id", username: "username4", useravatar: "uesravatar4", nickname: "nickname4", role: "client" },
                    { id: "user5-id", username: "username5", useravatar: "uesravatar5", nickname: "nickname5", role: "client" },
                    { id: "user6-id", username: "username6", useravatar: "uesravatar6", nickname: "nickname6", role: "client" },
                ],
            }
        };
        return response;
    }
    getChats(id) {
        console.log("getChats: ", id);
        const response = [
            {
                id: 'user1-id',
                messageType: 'GM',
                username: 'User Name1',
                nickname: 'Nickname1',
                body: 'Hey, This is a message sent by this person. It works like a message in any angular chat. Nothing very interesting to see here.',
                time: new Date('2022-07-04')
            },
            {
                id: 'user2-id',
                messageType: 'GM',
                username: 'User Name2',
                nickname: 'Nickname2',
                body: 'Hey, This is a message sent by this person. It works like a message in any angular chat. Nothing very interesting to see here.',
                imageUrl: '/assets/children.jpg',
                time: new Date('2022-07-05')
            },
            {
                id: 'user3-id',
                messageType: 'GM',
                username: 'User Name3',
                nickname: 'Nickname3',
                body: 'Hey, This is a message sent by this person. It works like a message in any angular chat. Nothing very interesting to see here.',
                time: new Date('2022-07-06')
            },
        ];
        return response;
    }
};
__decorate([
    (0, common_1.Get)('users/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "getChatUsers", null);
__decorate([
    (0, common_1.Get)('messages/:channelId'),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "getChatMessages", null);
__decorate([
    (0, common_1.Post)('user/signin-request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "loginRequest", null);
__decorate([
    (0, common_1.Post)('user/signin-verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "verifyRequest", null);
__decorate([
    (0, common_1.Get)('group/byaccount/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "userGroupRequest", null);
__decorate([
    (0, common_1.Get)('group/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "getGroupInfo", null);
__decorate([
    (0, common_1.Get)('chat/group/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "getChats", null);
ChattingController = __decorate([
    (0, common_1.Controller)('chatting'),
    __metadata("design:paramtypes", [chatting_service_1.ChattingService])
], ChattingController);
exports.ChattingController = ChattingController;
//# sourceMappingURL=chatting.controller.js.map