import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Repository, UpdateResult } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateRoomDTO } from './dto/createRooom.dto';
import { FilterRoomDTO } from './dto/filter-room.dto';
import { UpdateRoomDTO } from './dto/updateRoom.dto';
import { RoomType } from 'src/roomtype/entites/roomtype.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService) { }

  async createRoom(userId: number, createRoomDto: CreateRoomDTO): Promise<Room> {
    const user = await this.userRepository.findOneBy({ id: userId })
    try {
      const res = await this.roomRepository.save({
        ...createRoomDto, user
      })
      return await this.roomRepository.findOneBy({ id: res.id })
    } catch (error) {
      console.log(error)
      throw new HttpException('Can not create room', HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(@Query() query: FilterRoomDTO): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10
    const page = Number(query.page) || 1
    const search = query.search || ''
    const roomtype = Number(query.roomtype) || null
    const skip = (page - 1) * items_per_page
    const [res, total] = await this.roomRepository.findAndCount({
      where: [
        {
          room_number: Like('%' + search + '%'),
          roomtype: {
            id: roomtype
          }
        },
        {
          price_at_night: LessThan(500000),
          roomtype: {
            id: roomtype
          }
        },
      ],
      order: { create_At: 'ASC' },
      take: items_per_page,
      skip: skip,
      relations: {
        user: true,
        roomtype: true,
      },
      select: {
        roomtype: {
          id: true,
          type_name: true,
          description: true
        },
        user: {
          id: true,
          fullname: true,
          email: true,
          roles: true,
        }
      }
    })

    const lastPage = Math.ceil(total / items_per_page)
    const nextPage = page + 1 > lastPage ? null : page + 1
    const prevPage = page - 1 < 1 ? null : page - 1
    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage
    }
  }
   findAllReviewbyRoom() {
    return  this.roomRepository.find({
      relations: ['reviews']
    })
  }

  async findRoomById(id: number): Promise<Room > {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ['user', 'roomtype'],
      select: {
        roomtype: {
          id: true,
          type_name: true,
          description: true,
        },
        user: {
          id: true,
          fullname: true,
          email: true,
          roles: true,
        },
      }
    })
  }

  async updateRoom(roomId: number, updateRoomDto: UpdateRoomDTO): Promise<UpdateResult> {
    return await this.roomRepository.update(roomId, updateRoomDto)
  }

  async removeRoom(roomId: number): Promise<DeleteResult> {
    return await this.roomRepository.delete(roomId)

  }

  async removeMultiRoom(roomIds: string[]): Promise<DeleteResult> {
    return await this.roomRepository.delete({ id: In(roomIds) })
  }

  async checkIfRoomExist(roomIds: string[]): Promise<Room[]> {
    return await this.roomRepository.findBy({ id: In(roomIds) })
  }
}
