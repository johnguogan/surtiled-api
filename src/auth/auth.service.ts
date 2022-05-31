import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log("validateE: ", username, pass);
    
    const user = await this.usersService.findOne(username);
    
    if(user && user[0].password === pass) {
      const { password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log("aut.service: ", user);
    
    const payload = { username: user.names, sub: user.userId};
    return {
      user: user[0],
      access_token: this.jwtService.sign(payload),
    }
  }
}
