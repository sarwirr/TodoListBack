import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
const hat = require('hat');


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) { }

  async register(createUserDto: CreateUserDto) {

    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.userRepository.create({ ...createUserDto, token: hat() });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }

  async update(email: string, updateUserDto: UpdateUserDto) {

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }
    return this.userRepository.findOneAndUpdate({ email });
  }m

  async login(email: string, password: string) {
    
    const user = await this.userRepository.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return ({ token: user.token });
      }
      else {
        throw new UnauthorizedException('your password is invalid')
      }
    }
    throw new UnauthorizedException('this account does not exist');
    

  }

  remove(email: string) {
    return this.userRepository.findOneAndDelete({ email });
  }
}
