import { User } from "src/user/entities/user.entity"
import { RoomType } from "../../roomtype/entites/roomtype.entity"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateRoomDTO {
    @ApiProperty()
    room_number: string

    @ApiProperty()
    occupancy: number

    @ApiProperty()
    thumbnail: string

    @ApiProperty()
    price_at_night: number

    @ApiProperty()
    area: number

    @ApiProperty()
    roomAvailable: string
}
