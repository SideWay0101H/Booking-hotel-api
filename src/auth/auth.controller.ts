import { Body, Controller, Post, ValidationPipe, UsePipes, Query, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/auth/dto/registerUsers.dto';
import { LoginUsersDTO } from 'src/auth/dto/loginUsers.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/user/decorators/public.decorator';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    @Public()
    create(@Body() registerUserDTO: RegisterUserDTO): Promise<User>{
        console.log('register API')
        console.log(registerUserDTO)
        return this.authService.register(registerUserDTO)
    }

    @Post('login')
    @Public()
    @ApiResponse({status: 201, description: 'Login Successfully!'})
    @ApiResponse({status: 401, description: "Login Fail!"})
    loginUser(@Body() loginUserDTO: LoginUsersDTO): Promise<any>{
        console.log('login API')
        console.log(loginUserDTO)
        return this.authService.login(loginUserDTO)
    }

    @Post('refresh-token')
    @Public()
    refresh_token(@Body() {refresh_token}):Promise<any>{
        console.log('refresh token api')
        return this.authService.refreshToken(refresh_token)
    }

    
}
