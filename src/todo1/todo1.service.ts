import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodo1Dto } from './dto/create-todo1.dto';
import { UpdateTodo1Dto } from './dto/update-todo1.dto';
import { Todo, TodoDocument } from './entities/todo1.entity';

@Injectable()
export class Todo1Service {
  todoRepository: any;
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodo1Dto: CreateTodo1Dto): Promise<Todo> {
    const createdtodo = new this.todoModel(createTodo1Dto);
    return createdtodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
      where: { _id: id },
    });
  }

  update(id: string, updateTodo1Dto: UpdateTodo1Dto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodo1Dto);
  }

  async remove(id: string) {
    const todoToDelete = await this.todoModel.findOneAndDelete({where: {_id :id} })
  }
}
