import { Controller, Get, Post, Body, Param, Delete, Req, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from 'src/user/decorators/public.decorator';
import { CreateContactDTO } from './dto/createContact.dto';
import { Order } from './entities/order.entity';
import { Roles } from 'src/user/decorators/role.decorators';

@Controller('v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderdto: CreateOrderDto,) {
    return await this.orderService.create(createOrderdto)
  }

  @Get()
  async findAll():Promise<Order []>{
    return await this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(Number(id));
  }

  @Roles('Manager','Receptionst')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
