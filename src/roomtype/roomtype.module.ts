import { Module } from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { RoomtypeController } from './roomtype.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entites/roomtype.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType, User])
  ],
  controllers: [RoomtypeController],
  providers: [RoomtypeService, UserService]
})
export class RoomtypeModule { }
