import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
        private reflector: Reflector)
         { }
    async canActivate(context: ExecutionContext,
    ): Promise<boolean> {
        console.log("Vao AuthGuard=======> set user vao request")

        const isPublic = this.reflector.getAllAndOverride<string[]>('isPublic',[
            context.getHandler(),
            context.getClass()
        ])
        if(isPublic){
            return true
        }

        console.log("IsPublic =>",isPublic)

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(token,{
                secret: process.env.JWT_SECRET
            })
            const user = await this.userRepository.findOneBy({id: payload.id})
            request['user'] = user
            request['user_data'] = payload
            // // 1 Get token from header
            // const token = request.headers.authorization.split(' ')[1]
            // if (!token) {
            //     throw new ForbiddenException('Please provide access token')

            // }
            // // 2 jwtVerify validate token 
            // const payload = await this.jwtService.verifyAsync(
            //     token,
            //     {
            //         secret: process.env.JWT_SECRET
            //     }
            // )

            // // 3 find user in db based on jwtVerify
            // const user = await this.userSerive.findByEmail(payload.email)
            // if (!user) {
            //     throw new BadRequestException('User not belong to token, please try again')
            // }
            // // 4 Assign user to request object
            // request.currentUser = user

        } catch (error) {
            throw new HttpException({
                status: 419,
                message: "Token Expired",
            }, 419)
        }
        return true;
    }
    private extractTokenFromHeader(request: Request):string|undefined {
        const[type,token] = request.headers.authorization ? request.headers.authorization.split(' '): []

        return type === 'Bearer' ? token : undefined
    }
}