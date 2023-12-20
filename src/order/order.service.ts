import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, getManager } from 'typeorm';
import { Room } from 'src/room/entities/room.entity';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import * as moment from 'moment';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private userService: UserService,
    private roomService: RoomService
  ) { }

  async create(createOrderdto: CreateOrderDto) {
    try {
      const room = await this.roomService.findRoomById(createOrderdto.roomId)
      if (!room) {
        throw new Error('Not found room')
      }
      if(createOrderdto.check_in >= createOrderdto.check_out){
        throw new Error('Ngày đặt phòng không hợp lệ')
      }
      //Tạo ra booking  -> 👇✔
      const order = new Order()
      order.check_in = createOrderdto.check_in
      order.check_out = createOrderdto.check_out
      order.quantity = createOrderdto.quantity
      order.totalDays = this.calculateNumberOfDays(createOrderdto.check_in, createOrderdto.check_out)
      order.totalAmount = room.price_at_night * order.totalDays 
      order.rooms = [room],
        // order.contact = [contact]

        console.log(order);
        //when user order room then update roomAvailable == 
      room.roomAvailable = 'Hết phòng';
      await this.roomRepository.save(room);
      console.log(room);

      const result = await this.orderRepository.save(order)
      return {
        totalAmount: result.totalAmount,
        totalDays: result.totalDays,
        quantity: result.quantity,
        status: result.status,
        checkin: result.check_in.toString(),
        checkout: result.check_out.toString(),
      }

    } catch (err) {
      throw new Error('Error while booking room: ' + err.message);
    }

  }

  

  private calculateNumberOfDays(checkin: string, checkout: string): number {

    const checkinDate = moment(checkin, 'DD-MM-YYYY', true); // true to enable strict parsing
    const checkoutDate = moment(checkout, 'DD-MM-YYYY', true);

    if (!checkinDate.isValid() || !checkoutDate.isValid()) {
      throw new Error('Invalid date format. Please use DD-MM-YYYY format.');
    }

    return checkoutDate.diff(checkinDate, 'days');
  }



  async findAll(): Promise<Order []>{
    return await this.orderRepository.find()
  }

  findOne(id: number) {
    return this.orderRepository.findOne(
      {
        where: {
          status: 'Xác nhận'
        },
        relations: {
          rooms: {
            roomtype: true,
            user: true
          }
        },
        select: {
          id: true,
          check_in: true,
          check_out: true,
          quantity: true,
          totalDays: true,
          totalAmount: true,
          rooms: {
            id: true,
            room_number: true,
            occupancy: true,
            thumbnail: true,
            price_at_night: true,
            area: true,
            roomtype: {
              id: true,
              type_name: true,
              description: true
            },
            user: {
              id: true,
              fullname: true,
              email: true,
              address: true,
              phone: true,
            }
          }
        },

      }
    )
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    return await this.orderRepository.update(id,updateOrderDto)
  }

  async remove(id: number) {
    return await this.orderRepository.delete(id)
  }
}
