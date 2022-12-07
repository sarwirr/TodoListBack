import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo1Controller } from './todo1/todo1.controller';
import { Todo1Service } from './todo1/todo1.service';
import { Todo1Module } from './todo1/todo1.module';
import { DataSource } from 'typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    Todo1Module,
    MongooseModule.forRoot(
      'mongodb+srv://sarwir:UwOupSTJqhj6MUNe@cluster0.36mf4ku.mongodb.net/vacations?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, Todo1Controller],
  providers: [AppService, Todo1Service],
})
export class AppModule {}
