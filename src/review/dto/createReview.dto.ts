import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Room } from "src/room/entities/room.entity";

export class CreateReviewDTO {
    @ApiProperty()
    ratings: number

    @ApiProperty()
    comment: string
    
    @ApiProperty()
    @IsNotEmpty()
    room: Room
}