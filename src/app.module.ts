import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo1Controller } from './todo1/todo1.controller';
import { Todo1Module } from './todo1/todo1.module';

import { MongooseModule } from '@nestjs/mongoose';
import { NestApplication } from '@nestjs/core';
import { todo1Middleware } from './todo1/todo1.middleware';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    Todo1Module,
    MongooseModule.forRoot(
      'mongodb+srv://sarwir:UwOupSTJqhj6MUNe@cluster0.36mf4ku.mongodb.net/vacations?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, Todo1Controller],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer):any {
    consumer.apply(todo1Middleware).forRoutes('todo1')
  }
}
