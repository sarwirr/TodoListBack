import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Todo1Service } from './todo1.service';
import { CreateTodo1Dto } from './dto/create-todo1.dto';
import { UpdateTodo1Dto } from './dto/update-todo1.dto';
import { authGuard } from './auth.guard';

@Controller('todo1')
@UseGuards(authGuard)
export class Todo1Controller {
  constructor(private readonly todo1Service: Todo1Service) {}

  @Post()
  create(@Body() createTodo1Dto: CreateTodo1Dto) {
    return this.todo1Service.create(createTodo1Dto);
  }

  @Get()
  findAll() {
    return this.todo1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todo1Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodo1Dto: UpdateTodo1Dto) {
    return this.todo1Service.update(id, updateTodo1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todo1Service.remove(id);
  }
}
