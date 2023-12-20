import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Room } from 'src/room/entities/room.entity';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order,Room,User])],
  controllers: [OrderController],
  providers: [OrderService,UserService,RoomService],
})
export class OrderModule {}
