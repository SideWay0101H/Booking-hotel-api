import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class CreateUserDTO{
    @ApiProperty()
    @IsNotEmpty()
    fullname: string 

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiProperty()
    roles: string
    
    @ApiProperty()
    age: number

    @ApiProperty()
    phone: string
 
    @ApiProperty()
    address: string

}