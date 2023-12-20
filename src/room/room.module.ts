import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RoomType } from 'src/roomtype/entites/roomtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room,User,RoomType]),
],
  controllers: [RoomController],
  providers: [RoomService,UserService],
})
export class RoomModule { }
