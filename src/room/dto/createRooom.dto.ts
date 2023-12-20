import { IsNotEmpty } from "class-validator"
import { User } from "src/user/entities/user.entity"
import { RoomType } from "../../roomtype/entites/roomtype.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateRoomDTO {
    @ApiProperty()
    @IsNotEmpty()
    room_number: string

    @ApiProperty()
    @IsNotEmpty()
    occupancy: number

    @ApiProperty()
    @IsNotEmpty()
    price_at_night: number

    @ApiProperty()
    @IsNotEmpty()
    area: number

    @ApiProperty()
    thumbnail: string

    @ApiProperty()
    @IsNotEmpty()
    roomtype: RoomType

    @ApiProperty()
    roomAvailable: string

}
