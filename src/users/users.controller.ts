import { Body, Controller, Get, Post, Req, UseGuards, Header } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
    console.log("register request, ", createUserDto);
    
    const user = this.usersService.create(createUserDto)
    return user;
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    const users = this.usersService.findAll();
    return users;
  }
}
