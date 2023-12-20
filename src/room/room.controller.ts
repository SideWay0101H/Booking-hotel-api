import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req, Put, BadRequestException, Query, UsePipes, ValidationPipe, ParseArrayPipe } from '@nestjs/common';
import { RoomService } from './room.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/helpers/confg';
import { extname } from 'path';
import { CreateRoomDTO } from './dto/createRooom.dto';
import { FilterRoomDTO } from './dto/filter-room.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRoomDTO } from './dto/updateRoom.dto';
import { Room } from './entities/room.entity';
import { Roles } from 'src/user/decorators/role.decorators';
import { Public } from 'src/user/decorators/public.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { async } from 'rxjs';

@ApiBearerAuth()
@ApiTags('Room')
@Controller('v1/room')
export class RoomController {
  constructor(private roomService: RoomService) { }


  /**
   * Method Create Room
   * @param req 
   * @param createRoomDto 
   * @param file 
   * @returns 
   */
  // @Roles('Manager')
  @Post()
  @UseInterceptors(FileInterceptor('thumbnail', {
    storage: storageConfig('room'),
    fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname)
      const allowedExtArr = ['.jpg', '.png', '.jpeg']
      if (!allowedExtArr.includes(ext)) {
        req.fileValidationError = `wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
        cb(null, false)
      } else {
        const fileSize = parseInt(req.headers['content-length'])
        if (fileSize > 1024 * 1024 * 5) {
          req.fileValidationError = 'file size is to large. Accepted file size is less than 5 MB'
          cb(null, false)
        } else {
          cb(null, true)
        }
      }
    }
  }))
  async createRoom(@Req() req: any, @Body() createRoomDto: CreateRoomDTO, @UploadedFile() file: Express.Multer.File) {
    console.log(req['user_data'])
    console.log(createRoomDto)
    console.log(file)
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError)
    }
    if (!file) {
      throw new BadRequestException('File is required')
    }
    return await this.roomService.createRoom(req['user_data'].id, { ...createRoomDto, thumbnail: 'room/' + file.filename })
  }

  /**
   * Method Get All Room
   * @param query 
   * @returns 
   */
  @Public()
  @Get()
  async getAllRoom(@Query() query: FilterRoomDTO): Promise<any> {
    return await this.roomService.findAll(query)
  }
  // async getAllRoom(){
  //   return await this.roomService.findAll()
  // }



  /**
   * Method Get Detail Room
   * @param roomId 
   * @returns 
   */

  @Get(':id')
  findDetailRoom(@Param('id') id: string): Promise<Room> {
    console.log(id)
    return this.roomService.findRoomById(Number(id))
  }

  /**
   * Method Update Room
   * @param id 
   * @param updateRoomDto 
   * @returns 
   */
  // @UseGuards(AuthGuard)
  @Roles('Manager')
  @Put(':id')
  @UseInterceptors(FileInterceptor('thumbnail', {
    storage: storageConfig('room'),
    fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname)
      const allowedExtArr = ['.jpg', '.png', '.jpeg']
      if (!allowedExtArr.includes(ext)) {
        req.fileValidationError = `wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
        cb(null, false)
      } else {
        const fileSize = parseInt(req.headers['content-length'])
        if (fileSize > 1024 * 1024 * 5) {
          req.fileValidationError = 'file size is to large. Accepted file size is less than 5 MB'
          cb(null, false)
        } else {
          cb(null, true)
        }
      }
    }
  }))
  updateRoom(@Param('id') id: string, @Req() req: any, @Body() updateRoomDto: UpdateRoomDTO, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError)
    }
    if (file) {
      updateRoomDto.thumbnail = 'room/' + file.filename
    }
    return this.roomService.updateRoom(Number(id), updateRoomDto)
  }

  /**
   * Method Delete Room
   * @param roomId 
   * @returns 
   */
  // @UseGuards(AuthGuard)
  @Roles('Manager')
  @Delete(':id')
  removeRoom(@Param('id') roomId: string) {
    return this.roomService.removeRoom((Number(roomId)))
  }

  // @UseGuards(AuthGuard)
  @Roles('Manager')
  @Delete('multiple')
  multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
    console.log("delete multi =>", ids)
    return this.roomService.removeMultiRoom(ids)
  }

  @Public()
  @Get('review')
  async getReviewAllbyRoom(): Promise<Room []>{
    return await this.roomService.findAllReviewbyRoom()
  }

}
