import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChattingService } from './chatting.service';

@Controller('chatting')
export class ChattingController {
  constructor(private chattingService: ChattingService) {}

  @Get('users/:userId')
  getChatUsers(@Param('userId') userId: number) {
    console.log("getChatUsers: ", userId);
    const users = this.chattingService.getUsers(userId)
    return users
  }

  @Get('messages/:channelId')
  getChatMessages(@Param('channelId') channelId: number) {
    console.log("getChatMessages: ", channelId);
    const messages = this.chattingService.getMessages(channelId)
    return messages
  }

  /**
   *  For Emilon Backend Test  -----------------------------------------------
   */
  @Post('user/signin-request')
  loginRequest(@Body() data) {
    console.log("loginInfo: ", data);
    return data
  }

  @Post('user/signin-verify')
  verifyRequest(@Body() data) {
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
    }
    return response
  }

  @Get('group/byaccount/:id')
  userGroupRequest(@Body() data) {
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
          },{
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
          },{
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
          },{
            "id": "5cab4ab32-8ca2-4e0e-a1cd-c71e47737c26",
            "groupName": "group11",
            "imgUrl": "group11_img_url",
            "creatorName": "user3",
            "unreadMessages": 1,
            "updatedAt": "2022-07-03T12:47:55.240Z"
          },
        ]
    }
    return response
  }

  @Get('group/:id')
  getGroupInfo(@Param('id') id: string, @Body() data) {
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
            { id: "user1-id", username: "username1", useravatar: "uesravatar1", nickname: "nickname1", role: "client"},
            { id: "user2-id", username: "username2", useravatar: "uesravatar2", nickname: "nickname2", role: "client"},
            { id: "user3-id", username: "username3", useravatar: "uesravatar3", nickname: "nickname3", role: "client"},
            { id: "user4-id", username: "username4", useravatar: "uesravatar4", nickname: "nickname4", role: "client"},
            { id: "user5-id", username: "username5", useravatar: "uesravatar5", nickname: "nickname5", role: "client"},
            { id: "user6-id", username: "username6", useravatar: "uesravatar6", nickname: "nickname6", role: "client"},
          ],
      }
    }
    return response;
  }

  @Get('chat/group/:id')
  getChats(@Param('id') id: string) {
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
    ]

    return response
  }
}
