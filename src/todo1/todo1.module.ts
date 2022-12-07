import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo1Service } from './todo1.service';
import { Todo1Controller } from './todo1.controller';
import { Todo, TodoSchema } from './entities/todo1.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [Todo1Controller],
  providers: [Todo1Service],
})
export class Todo1Module {}
