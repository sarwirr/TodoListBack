import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Todo } from 'src/todo1/entities/todo1.entity';
import { Roles } from 'src/roles.enum';
import { Notification } from 'src/notification/entities/notification.entity';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
 
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


    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: () => Notification }]
    })
    notification: Notification[];


    @Prop()
    token: string;

    @Prop({
            enum: Roles,
            default: Roles.User
    })
    roles: string;

}

export const UserSchema = SchemaFactory.createForClass(User);


