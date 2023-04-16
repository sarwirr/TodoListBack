import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubscribeMessage } from '@nestjs/websockets';

@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto , @Request() req) {
    return this.notificationService.create(createNotificationDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }
  
  
  @Get('user')
  findUserNotif(@Request() req) {
    return this.notificationService.findUserNotif(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update( id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.notificationService.remove(id);
  }
}
