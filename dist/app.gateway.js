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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const users_service_1 = require("./users/users.service");
const chatting_service_1 = require("./chatting/chatting.service");
let AppGateway = class AppGateway {
    constructor(usersService, chattingService) {
        this.usersService = usersService;
        this.chattingService = chattingService;
        this.logger = new common_1.Logger('AppGateway');
    }
    async handleConnect(client, payload) {
        console.log("connect log: ", payload, client.id);
        const data = { id: payload.id, socketId: client.id };
        const user = await this.usersService.updateUser(data);
        console.log("updated User: ", user);
        this.server.emit('user', { userid: payload.id, connected: true });
        this.server.to(client.id).emit('user', { state: true, socketId: client.id });
    }
    async handleMessage(client, payload) {
        console.log("handleMessage: ", payload, client.id);
        const { content, id, memberId, channelId } = payload;
        let room;
        if (!channelId)
            room = await this.chattingService.createChannel({ user1: id, user2: memberId });
        else
            room = await this.chattingService.getChannel(channelId);
        const newChat = await this.chattingService.createMessage({ channel: room, message: content, senderId: id });
        room = await this.chattingService.getChannel(room.id);
        console.log("room data: ", room);
        console.log("new chat: ", newChat.id, newChat);
        if (room.user1.socketId)
            this.server.to(room.user1.socketId).emit('message', { message: content, senderId: parseInt(id), createdAt: newChat.createdAt, memberId, channelId: room.id, socketId: room.user1.socketId, messageId: newChat.id });
        if (room.user2.socketId)
            this.server.to(room.user2.socketId).emit('message', { message: content, senderId: parseInt(id), createdAt: newChat.createdAt, memberId, channelId: room.id, socketId: room.user2.socketId, messageId: newChat.id });
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleConnection(client, ...args) {
        console.log("args: ", args);
        this.logger.log(`Client connected: ${client.id}`);
        console.log(`Client connected: ${client}`);
    }
    async handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        client.disconnect(true);
        const result = await this.usersService.disableUserSocket(client.id);
        console.log("user socket disabled: ", result);
        if (result) {
            this.server.emit('user', { userid: result.id, connected: false });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleConnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleMessage", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3006, { cors: true }),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        chatting_service_1.ChattingService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map