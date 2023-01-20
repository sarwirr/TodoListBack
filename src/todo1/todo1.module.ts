import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo1Service } from './todo1.service';
import { Todo1Controller } from './todo1.controller';
import { Todo, TodoSchema } from './entities/todo1.entity';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [UserModule,
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [Todo1Controller],
  exports:[Todo1Service],
  providers: [Todo1Service],
})
export class Todo1Module {}
