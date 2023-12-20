import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { RegisterUserDTO } from './dto/registerUsers.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUsersDTO } from './dto/loginUsers.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }


    async register(registerUserDTO: RegisterUserDTO): Promise<User> {
        const hashPassword = await this.hashPassword(registerUserDTO.password)
        return await this.userRepository.save({ ...registerUserDTO, refresh_token: "refresh_token_string", password: hashPassword })
    }


    async login(loginUserDTO: LoginUsersDTO): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { email: loginUserDTO.email }
        })
        await new Promise(resolve => setTimeout(resolve,1000))
        if (!user) {
            throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED)
        }
        const checkPassword = bcrypt.compareSync(loginUserDTO.password, user.password)
        if (!checkPassword) {
            throw new HttpException('Password is not correct', HttpStatus.UNAUTHORIZED)
        }

        //genrate access token and refresh token 
        const payload = {
            id: user.id,
            email: user.email
        }

        return this.generateToken(payload)
    }

    async refreshToken(refresh_token: string): Promise<any> {
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: process.env.JWT_SECRET,
            })
            console.log(verify)
            const checkExistToken = await this.userRepository.findOneBy({ email: verify.email, refresh_token })
            if (checkExistToken) {
                return this.generateToken({ id: verify.id, email: verify.email })
            } else {
                throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST)
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const hash = await bcrypt.hash(password, salt)

        return hash
    }

    private async generateToken(payload: { id: number, email: string }) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            // expiresIn: '10m'
        })
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '7d'
        })
        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token }
        )

        return {
            access_token,
            refresh_token
        }
    }
  
}



