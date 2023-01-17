import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from 'jsonwebtoken';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
                private jwtService : JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }}
    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.email};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}