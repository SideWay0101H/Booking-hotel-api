import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateReviewDTO } from './dto/createReview.dto';
import { UpdateReviewDTO } from './dto/updateReview.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>,
                private userService: UserService){}

    async create(userId: number, createReviewDto: CreateReviewDTO){
        const user = await this.userService.findOne(userId)
        try {
            const res = await this.reviewRepository.save({
                ...createReviewDto,user
            })
            return await this.reviewRepository.findOneBy({ id: res.id})
        } catch (error) {
           throw new HttpException('Can not create Review', HttpStatus.BAD_REQUEST)
        }
    }


    async findAll(): Promise<Review []>{
        return await this.reviewRepository.find()
    }

    async findAllByRoom(id: number): Promise<Review []>{
        // const room = await this.roomService.findRoomById(id)
        return await this.reviewRepository.find({
            where: {
                room: {id}
            },
            relations: {
                user: true,
                room: {
                    roomtype: true
                }
            }
        })
    }

    async findOne(id: number): Promise<Review>{
        const review = await this.reviewRepository.findOne({
            where: {
                room: { id}
            },
            relations: {
                user: true,
                room: {
                    roomtype: true
                }
            }
        })
        if(!review) throw new NotFoundException('Review not found')
        return review
    }

    async updateReview(reviewId: number,updateReviewDto: UpdateReviewDTO):Promise <UpdateResult>{
        return await this.reviewRepository.update(reviewId,updateReviewDto)
    }

    async delete(reviewId: number): Promise<DeleteResult>{
        return await this.reviewRepository.delete(reviewId)
    }

    async findOneByUserAndRoom(userId: number,roomId:number){
        return await this.reviewRepository.findOne({
            where:{
                user: {
                    id: userId
                },
                room: {
                    id: roomId
                }
            },
            relations: {
                user: true,
                room: {
                    roomtype: true
                }
            }
        })
    }

    async multipleDelete(ids: string[]): Promise<DeleteResult> {
        return await this.reviewRepository.delete({ id: In(ids) })
      }
}
