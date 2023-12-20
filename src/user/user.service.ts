import { DatabaseModule } from './../database/database.module';
import { Injectable, NotFoundException, BadRequestException, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { S3Client } from '@aws-sdk/client-s3'
import { CreateUserDTO } from './dto/createUser.dto';
import { FilterUserDTO } from './dto/fliter-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private readonly s3Client = new S3Client({ region: this.configService.getOrThrow('AWS_S3_REGION') }) 
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>,
  private configService: ConfigService) { }

  async findAll(query: FilterUserDTO): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10
    const page = Number(query.page) || 1
    const skip = (page - 1) * items_per_page
    const keyword = query.search || ''
    const [res, total] = await this.userRepository.findAndCount({
      where: [
        { fullname: Like('%' + keyword + '%') },
        { email: Like('%' + keyword + '%') },
      ],
      order: { create_at: 'ASC' },
      take: items_per_page,
      skip: skip,
      select: ['id', 'fullname', 'email', 'roles', 'age','phone','address', 'create_at', 'update_at']
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

  // async findAll(){
  //   return await this.userRepository.find()
  // }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id })
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const hashpassword = await bcrypt.hash(createUserDTO.password, 10)
    createUserDTO.password = hashpassword
    return await this.userRepository.save(createUserDTO)
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }


  async update(id: number, updateUserDto: UpdateUserDTO): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async updatePW(id: number,data):Promise<any>{
    return await this.userRepository.update(id,data)
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id)
  }

  async updateAvatar(id: number, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { avatar })
  }

  async multipleDelete(ids: string[]): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: In(ids) })
  }

}
