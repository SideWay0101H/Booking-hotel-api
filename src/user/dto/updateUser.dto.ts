import { ApiProperty } from '@nestjs/swagger'
export class UpdateUserDTO{
    @ApiProperty()
    age: number

    @ApiProperty()
    phone: string

    @ApiProperty()
    address: string

    @ApiProperty()
    roles: string
}