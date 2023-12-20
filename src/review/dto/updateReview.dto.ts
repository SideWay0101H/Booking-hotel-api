import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
export class UpdateReviewDTO {
    @ApiProperty()
    ratings: number

    @ApiProperty()
    comment: string

    user: User

    room: Room
}