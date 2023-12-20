import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateOrderDto{
    @ApiProperty()
    status: string
    
    @ApiProperty()
    quantity: number
}
