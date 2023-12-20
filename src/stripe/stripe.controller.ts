import { Body, Controller, Post } from '@nestjs/common';
import { CreateChargeDto } from './dto/createcharge.dto';
import { StripeService } from './stripe.service';

@Controller('v1/checkout')
export class StripeController {
    constructor(private stripeService: StripeService){}
    
    @Post('payment')
    async createCharge(@Body() createChargeDto: CreateChargeDto){
        // return await this.stripeService.createCharge(createChargeDto)
    }
}