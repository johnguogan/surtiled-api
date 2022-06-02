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
      console.log(await bcrypt.hash(pass, 10), result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log("aut.service: ", user);
    const userInfo = await this.usersService.findOne(user.userid);
    const payload = { username: user.names, sub: user.userId};
    const {password, ...result} = userInfo
    return {
      user: result,
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10)
    let response = await this.usersService.create(user)
    if (response) {
      const { password, ...result } = response
      return result
    }
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token)
  }
}
