import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io'
import { UsersService } from './users/users.service';
import { ChattingService } from './chatting/chatting.service';
import { rootCertificates } from 'tls';

@WebSocketGateway(3006, { cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor(
    private usersService: UsersService,
    private chattingService: ChattingService,
  ){}

  @SubscribeMessage('user')
  async handleConnect(client: Socket, payload: any): Promise<void> {
    console.log("connect log: ", payload, client.id);
    const data = { id: payload.id, socketId: client.id}
    const user = await this.usersService.updateUser(data)
    console.log("updated User: ", user)
    
    // this.server.emit('message', payload);
    this.server.to(client.id).emit('user', {state: true})
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
      
    this.chattingService.createMessage({channel: room, message: content, senderId: id})
      
    room = await this.chattingService.getChannel(room.id)
    console.log("room data: ", room);
    
    if(room.user1.socketId)
      this.server.to(room.user1.socketId).emit('message', {message: content, senderId: parseInt(id), createdAt: new Date(), memberId, channelId: room.id})
    if(room.user2.socketId)
      this.server.to(room.user2.socketId).emit('message', {message: content, senderId: parseInt(id), createdAt: new Date(), memberId, channelId: room.id})
    

    // this.server.emit('message', payload);
    // this.server.to(client.id).emit('message', 'server to emit')
  }

  afterInit(server: Server) {
      this.logger.log('Init')
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const result = await this.usersService.disableUserSocket(client.id)
    console.log("user socket disabled: ", result);
    
  }
}
