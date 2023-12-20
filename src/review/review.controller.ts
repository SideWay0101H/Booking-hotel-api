import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './entity/review.entity';
import { CreateReviewDTO } from './dto/createReview.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UpdateReviewDTO } from './dto/updateReview.dto';
import { Public } from 'src/user/decorators/public.decorator';
import { Roles } from 'src/user/decorators/role.decorators';

@Controller('v1/review')
export class ReviewController {
    constructor(private reviewService: ReviewService){}

    @Post()
    async createReview(@Req() req:any,@Body() createReviewDto: CreateReviewDTO){
        console.log(req['user_data'])
        return await this.reviewService.create(req['user_data'].id,createReviewDto)
    }
    
    @Public()
    @Get()
    async findAllReview(): Promise<Review []>{
        return await this.reviewService.findAll()
    }

    @Public()
    @Get('room')
    async findAllReviewByRoom(@Body('roomId') roomId: number){
        return await this.reviewService.findAllByRoom(roomId)
    }

    @Public()
    @Get(':id')
    async findOneReview(@Param('id') id: string): Promise<Review>{
        return await this.reviewService.findOne(Number(id))
    }

    
    @Roles('Manager','Guest')
    @Put(':id')
    async updateReview(@Param('id') id: string,@Body() updateReviewdto: UpdateReviewDTO){
        return await this.reviewService.updateReview(Number(id),updateReviewdto)
    }
    
    @Roles('Manager')
    @Delete(':id')
    async removeReview(@Param('id') id: string){
        return await this.reviewService.delete(Number(id))
    }

    @Roles('Manager')
    @Delete('multiple')
    multipleDelete(@Query('ids' ,new ParseArrayPipe({items:String, separator: ','})) ids: string[]){
        console.log("delete multi =>",ids)
        return this.reviewService.multipleDelete(ids)
    }
}