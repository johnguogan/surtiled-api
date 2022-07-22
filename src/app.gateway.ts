import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io'
import { UsersService } from './users/users.service';
import { ChattingService } from './chatting/chatting.service';
import { rootCertificates } from 'tls';
import { OrdersService } from './orders/orders.service';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor(
    private usersService: UsersService,
    private chattingService: ChattingService,
    private ordersService: OrdersService,
  ){}

  // @SubscribeMessage('send_message')
  // listenForMessages(@MessageBody() data: string) {
  //   // this.server.sockets.emit('receive_message', data);
  //   console.log("send_message: ", data);
    
  // }

  @SubscribeMessage('user')
  async handleConnect(client: Socket, payload: any): Promise<void> {
    console.log("connect log: ", payload, client.id);
    const data = { id: payload.id, socketId: client.id}
    const user = await this.usersService.updateUser(data)
    console.log("updated User: ", user)
    this.server.emit('user', {userid: payload.id, connected: true})
    
    // this.server.emit('message', payload);
    this.server.to(client.id).emit('user', {state: true, socketId: client.id})
    // this.server.disconnectSockets
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    console.log("handleMessage: ", payload, client.id);
    const { content, id, memberId, channelId } = payload
    let room: any;
    if(!channelId)
      room= await this.chattingService.createChannel({user1: id, user2: memberId})
    else
      room = await this.chattingService.getChannel(channelId)
      
    const newChat = await this.chattingService.createMessage({channel: room, message: content, senderId: id})
      
    room = await this.chattingService.getChannel(room.id)
    console.log("room data: ", room);
    console.log("new chat: ", newChat.id, newChat);
    
    // console.log("socket data: ", client);
    
    if(room.user1.socketId) 
      this.server.to(room.user1.socketId).emit('message', {message: content, senderId: parseInt(id), createdAt: newChat.createdAt, memberId, channelId: room.id, socketId: room.user1.socketId, messageId: newChat.id})
    if(room.user2.socketId) 
      this.server.to(room.user2.socketId).emit('message', {message: content, senderId: parseInt(id), createdAt: newChat.createdAt, memberId, channelId: room.id, socketId: room.user2.socketId, messageId: newChat.id})

    // this.server.emit('message', payload);
    // this.server.to(client.id).emit('message', 'server to emit')
  }

  @SubscribeMessage('orderComplete')
  async handleOrderComplete(client: Socket, payload: any): Promise<void> {
    const {orderId, orderNumber, userId, socketId} = payload
    console.log("orderComplete: ", client.id, payload);
    
    if(socketId)
      this.server.to(socketId).emit('orderComplete', {orderId, userId, orderNumber})
  }
  

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("args: ", args);
    
    this.logger.log(`Client connected: ${client.id}`)
    console.log(`Client connected: ${client}`)
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // client.leave(client.id)
    client.disconnect(true)
    // this.server.socketsLeave(client.id)
    const result = await this.usersService.disableUserSocket(client.id)
    console.log("user socket disabled: ", result);
    if(result) {
      this.server.emit('user', {userid: result.id, connected: false})
    }
  }
}
