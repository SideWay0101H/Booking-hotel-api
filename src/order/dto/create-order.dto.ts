import { Room } from '../../room/entities/room.entity';
export class CreateOrderDto {
    check_in: string
    
    check_out: string

    quantity: number
        
    roomId: number

}
