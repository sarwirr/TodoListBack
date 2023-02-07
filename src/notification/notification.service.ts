import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NotifDocument, Notification } from './entities/notification.entity';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private NotifModel: Model<NotifDocument>,
  @InjectModel(User.name) private userRepository: Model<UserDocument>,
  private readonly us: UserService) { }

  async create(createNotificationDto: CreateNotificationDto , id : any): Promise <Notification> {
    const user = await this.us.findUserbyId(id);

    const createdNotif = new this.NotifModel({...createNotificationDto, user: user._id} );
    const savedNotif =  await createdNotif.save();
    
    user.notification.push(savedNotif);
    await this.us.update(user.email, { notification: user.notification } as UpdateUserDto);
    return savedNotif;
  }

  findAll(): Promise<Notification[]> {
    return this.NotifModel.find().populate('user').exec();
  }


  async findUserNotif(id: any): Promise<Notification[]> {
    const user  = await this.userRepository.findOne({ _id :id}).populate('notification').exec();
    return user.notification;
  }

  async findOne(id: number):Promise<Notification> {
    return this.NotifModel.findOne({
        _id: id
    })
    ;
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.NotifModel.findByIdAndUpdate(id, updateNotificationDto);
  }

  remove(id: any) {
    
    return this.NotifModel.findOneAndDelete({ _id: id });
  }
}
