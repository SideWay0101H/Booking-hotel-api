import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/services.entity';
import { Repository } from 'typeorm';
import { ServiceOrder } from './entities/service_order.entity';
import { CreateServicesdto } from './dto/create_service.dto';


@Injectable()
export class ServicesService {
    constructor(@InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(ServiceOrder) private serviceorderRepository: Repository<ServiceOrder>){}
    
    async createServiceOrder(createServiceOrderDto: {serviceId:number, orderId: number}){
        const service = await this.serviceRepository.findOne({ where: {id: createServiceOrderDto.serviceId}})
        if(!service){
            throw new NotFoundException('Not found Service Order')
        }
        await this.serviceorderRepository.save(createServiceOrderDto)
    }

    async createSerive(dto: CreateServicesdto){
        return await this.serviceRepository.save(dto)
    }

    async getAllServices():Promise<Service []>{
        return this.serviceRepository.find()
    }
}
