import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type NotifDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {

    _id;

    @Prop({
        required: true
    })
    description: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: () => "User"
    })
    user: User;


}
export const NotifSchema = SchemaFactory.createForClass(Notification);
