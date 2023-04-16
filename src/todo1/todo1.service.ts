import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodo1Dto } from './dto/create-todo1.dto';
import { UpdateTodo1Dto } from './dto/update-todo1.dto';
import { Todo, TodoDocument } from './entities/todo1.entity';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';


@Injectable()
export class Todo1Service {
  todoRepository: any;
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
  @InjectModel(User.name) private userRepository: Model<UserDocument>,
  private readonly us : UserService,
  private readonly ns: NotificationService) {}

  async create(createTodo1Dto: CreateTodo1Dto , id:any ) {
    const user = await this.us.findUserbyId(id);
    const createdtodo = new this.todoModel({...createTodo1Dto, owner: user._id} );
    const savedtodo = await createdtodo.save();
    // console.log(savedtodo._id.toString());
    user.todolist.push(savedtodo);
    await this.us.update(user.email, { todolist: user.todolist } as UpdateTodo1Dto);
    return savedtodo;
    
  }

  async createforuser(createTodo1Dto: CreateTodo1Dto , id:any ) {
    
    
    const user = await this.us.findUserbyId(id);
    
    
    const createdtodo = new this.todoModel({...createTodo1Dto, owner: user._id} );
    const savedtodo = await createdtodo.save();
    
    user.todolist.push(savedtodo);
    await this.us.update(user.email, { todolist: user.todolist } as UpdateTodo1Dto);
    
    this.ns.create({
      description: `You have a new todo : ${savedtodo.name}`,
      user: user.name,
    }, user._id);
    
    return savedtodo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().populate('owner').exec();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
       _id: id 
    });
  }

  update(id: string, updateTodo1Dto: UpdateTodo1Dto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodo1Dto);
  }

  async remove(id: any) {
    await this.todoModel.findOneAndDelete({ _id: id });
 
  }
}
