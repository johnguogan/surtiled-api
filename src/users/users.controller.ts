import { Body, Controller, Get, Post, Req, UseGuards, Header, Param, Delete } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @Header('content-type', 'application/x-www-form-urlencoded')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto)
    return user;
  }

  @Get('userinfo')
  async getUser(@Body() data: any) {
    const result = await this.usersService.findOne(data.userid)
    const {password, ...info} = result
    return info
  }

  @Get('list')
  // @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    const users = this.usersService.findUsers()
      .then(response => {
        // console.log("userlist: ", response);
        return response
      });
    return users;
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  addUser(@Body() data) {
    const user = this.usersService.addUser(data)
      .then(response => {
        return response
      })
    return user
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() updateData) {
    const user = this.usersService.updateUser(updateData)
      .then(response => {
        return response
      })
    return user
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id)
  }
}
