import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('/register')
  create(): string {
    return ("")
  }

  @Get('/users')
  findAll(@Req() request: Request): string {
    return ""
  }
}
