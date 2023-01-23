import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() body: { email: string, password: string }) {
    return this.userService.login(body.email, body.password);
  }

  @Get('findall')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findalltodos')
  findAllTodos(@Param('id') id :any ) {
    return this.userService.findAllTodos(id);
  }

  @Get('findUserbyId/:id')
  findUserbyId(@Param('id') id :any) {
    return this.userService.findUserbyId(id);
  }
  


  @Get(':email')
  findOne(@Param('email') email :string) {
    return this.userService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
