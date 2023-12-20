import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entites/roomtype.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateRoomTypeDTO } from './dto/createRoomType.dto';
import { UpdateRoomTypeDTO } from './dto/updateRoomType.dto';

@Injectable()
export class RoomtypeService {
    constructor(@InjectRepository(RoomType) private roomTypeRepository: Repository<RoomType>,
        @InjectRepository(User) private userRepository: Repository<User>) { }

    async createType(userId: number,createTypeDto: CreateRoomTypeDTO) {
        const user = await this.userRepository.findOneBy({ id: userId })
        try {
            const res = await this.roomTypeRepository.save({
                ...createTypeDto,user
            })
            return await this.roomTypeRepository.findOneBy({ id: res.id })
        } catch (error) {
            throw new HttpException('Can not create roomtype', HttpStatus.BAD_REQUEST)
        }
    }

    async findAll():Promise <RoomType[]> {
       return await this.roomTypeRepository.find()           
    }

    async findTypeById(id: number) {
        return await this.roomTypeRepository.findOneBy({ id })
    }

    async updateType(roomtypeId: number, updateTypeDto: UpdateRoomTypeDTO): Promise<UpdateResult> {
        return await this.roomTypeRepository.update(roomtypeId, updateTypeDto)
    }

    async removeRoomType(roomtypeId: number): Promise<DeleteResult> {
        return await this.roomTypeRepository.delete(roomtypeId)
    }
}



