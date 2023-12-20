import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/services.entity';
import { ServicesController } from './services.controller';
import { ServiceOrder } from './entities/service_order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Service,ServiceOrder])],
    controllers: [ServicesController],
    providers: [ServicesService]
})
export class ServicesModule {}
