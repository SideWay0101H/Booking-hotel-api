import { Body, Controller, Post, Req, UseGuards, Get, Param, Delete, Put, UsePipes, ValidationPipe, HttpException, HttpStatus, Query } from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateRoomTypeDTO } from './dto/createRoomType.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomType } from './entites/roomtype.entity';
import { UpdateRoomTypeDTO } from './dto/updateRoomType.dto';
import { query } from 'express';
import { Roles } from 'src/user/decorators/role.decorators';

@ApiBearerAuth()
@ApiTags('RoomType')
@Controller('v1/type')
export class RoomtypeController {
    constructor(private roomtypeService: RoomtypeService) { }
    // CRUD ROOM TYPE 
    @Roles('Manager')
    @Post()
    async createType(@Req() req:any ,@Body() createTypeDto: CreateRoomTypeDTO) {
        // console.log(req['user_data'])
        console.log(createTypeDto)
        const userId = req['user_data'].id;
        return await this.roomtypeService.createType(userId, { ...createTypeDto })
    }

    @Get()
    async findAll(): Promise <RoomType []>{
        return await this.roomtypeService.findAll()
    }


    @Roles('Manager')
    @Put(':id')
    updateType(@Param('id') id: number, @Body() updateTypeDto: UpdateRoomTypeDTO) {
        return this.roomtypeService.updateType(id, updateTypeDto)
    }

    @Roles('Manager')
    @Delete(':id')
    removeType(roomTypeId: number) {
        return this.roomtypeService.removeRoomType(roomTypeId)
    }
}
