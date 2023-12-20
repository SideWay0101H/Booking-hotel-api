import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDTO{
    @ApiProperty()
    @IsNotEmpty()
    fullname: string 

    @ApiProperty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    password: string

}

