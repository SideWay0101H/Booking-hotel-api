import { IsNotEmpty } from "class-validator"

export class CreateContactDTO {
    @IsNotEmpty()
    guestName: string
    @IsNotEmpty()
    guestEmail: string
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    phone: string
}