import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServicesdto } from './dto/create_service.dto';
import { Service } from './entities/services.entity';

@Controller('v1/services')
export class ServicesController {
    constructor(private readonly serviceService: ServicesService){}

    @Post('ServiceOrder')
    async createServiceOrder(@Body() createSOdto: {serviceId: number,orderId: number}){
      return  await this.serviceService.createServiceOrder(createSOdto)
    }
    @Post()
    async createService(@Body() createServiceDto: CreateServicesdto){
      return  await this.serviceService.createSerive(createServiceDto)
    }

    @Get()
    async getAllService(): Promise<Service []>{
       return this.serviceService.getAllServices()
    }
}
