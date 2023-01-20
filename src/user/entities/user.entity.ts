import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Todo } from 'src/todo1/entities/todo1.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    // save() {
    //   throw new Error('Method not implemented.');
    // }

    _id;
    
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        unique : true,
        required: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: () => Todo }]
    })
    todolist: Todo[];

    @Prop()
    token: string;


}

export const UserSchema = SchemaFactory.createForClass(User);


