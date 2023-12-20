import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { Room } from 'src/room/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review,User,Room])
  ],
  controllers: [ReviewController],
  providers: [ReviewService,UserService,RoomService]
})
export class ReviewModule {}
