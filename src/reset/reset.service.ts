import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reset } from './reset.entity';
import { Repository } from 'typeorm';
import { ResetDTO } from './reset.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ResetService {
    constructor(@InjectRepository(Reset) private resetRepository: Repository<Reset>){}

    async create(dto: ResetDTO):Promise<Reset>{
        return await this.resetRepository.save(dto)
    }

    async findOne(condition): Promise<Reset> {
        console.log(condition)
        return await this.resetRepository.findOneBy(condition)
    }
}
