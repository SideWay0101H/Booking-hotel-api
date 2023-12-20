import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUsersDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    password: string
}