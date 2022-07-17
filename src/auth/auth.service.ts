import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
    if(user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userInfo = await this.usersService.findOne(user.userid);
    const payload = { username: user.names, sub: user.userId};
    const access_token = this.jwtService.sign(payload)
    await this.usersService.updateUserToken(userInfo.id, access_token)
    const {password, ...result} = userInfo

    return {
      user: result,
      access_token
    }
  }

  async loginByToken(token: string) {
    const userInfo = await this.usersService.findOneByToken(token);
    const payload = { username: userInfo.names, sub: userInfo.userid};
    const access_token = this.jwtService.sign(payload)
    await this.usersService.updateUserToken(userInfo.id, access_token)
    const {password, ...result} = userInfo

    return {
      user: result,
      access_token
    }
  }

  async register(user: CreateUserDto) {
    const exist = await this.usersService.findOne(user.userid)
    if(exist)
      return false
    user.password = await bcrypt.hash(user.password, 10)
    user['createdAt'] = new Date()
    user['updatedAt'] = new Date()
    let response = await this.usersService.create(user)
    console.log("/register-result: ", response);
    if (response) {
      const { password, ...result } = response
      return result
    }
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token)
  }
}
