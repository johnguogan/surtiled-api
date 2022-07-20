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
    console.log("login info: ", user);
    
    const userInfo = await this.usersService.findOne(user.userid);
    if(userInfo) {
      const comp = await bcrypt.compare(user.password, userInfo.password)
      if(comp) {
        const payload = { username: user.names, sub: user.userId};
        const access_token = this.jwtService.sign(payload)
        await this.usersService.updateUserToken(userInfo.id, access_token)
        const {password, ...result} = userInfo
    
        return {
          user: result,
          access_token
        }
      } else
        return {
          state: "Contraseña incorrecta"
        }
    } else 
      return {
        state: "No existe ningún usuario"
      }
  }

  async loginByToken(token: string) {
    const userInfo = await this.usersService.findOneByToken(token);
    if(userInfo) {
      const payload = { username: userInfo.names, sub: userInfo.userid};
      const access_token = this.jwtService.sign(payload)
      await this.usersService.updateUserToken(userInfo.id, access_token)
      const {password, ...result} = userInfo
      return {
        user: result,
        access_token
      }
    } else 
      return false
  }

  async register(user: CreateUserDto) {
    const exist = await this.usersService.findOne(user.userid)
    if(exist)
      return false
    // const salt = bcrypt.genSalt(10)
    // bcrypt.genSalt(10, (err, salt) => {
      // bcrypt.hash(user.password, salt, async function(err, hash) {
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        user['createdAt'] = new Date()
        user['updatedAt'] = new Date()
        let response = await this.usersService.create(user)
        console.log("/register-result: ", response);
        if (response) {
          const { password, ...result } = response
          return result
        }
      // })
    // })
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token)
  }
}
