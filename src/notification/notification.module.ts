import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Notification ,NotifSchema } from './entities/notification.entity';

@Module({
  imports: [UserModule,
    MongooseModule.forFeature([{ name: Notification.name, schema: NotifSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])

  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports:[NotificationService],
})
export class NotificationModule {}
