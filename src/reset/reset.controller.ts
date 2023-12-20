import { Body, Controller, Post, BadRequestException, NotFoundException, Put } from '@nestjs/common';
import { ResetService } from './reset.service';
import { Public } from 'src/user/decorators/public.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Controller('v1')
export class ResetController {
    constructor(private resetService: ResetService,
                private mailService: MailerService,
                private userSerive: UserService
        ){}

    @Public()
    @Post('forgot')
    async forgot(@Body('email') email:string) {
        const token = Math.random().toString(20).substr(2,10)

        await this.resetService.create({
            email,
            token,
        })

        const url = `http://localhost:5000/v1/reset/${token}`;

        await this.mailService.sendMail({
            to: email,
            subject: 'Đặt lại mật khẩu của bạn',
            html: `Click <a href="${url}">Tại đây</a> để đặt lại mật khẩu của bạn! `
        })

        return {
            message: 'Check your email'
        }
    }

    @Public()
    @Put('reset')
    async reset(
        @Body('token') token: string,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string
    ){
        if(password != password_confirm){
            throw new BadRequestException('mật khẩu không khớp')
        }

        const reset = await this.resetService.findOne({token})
        if(!reset){
            throw new NotFoundException('Không tìm thấy yêu cầu đặt lại mật khẩu');
        }
        console.log(reset)
        const email = reset.email
        console.log(email)
        const user = await this.userSerive.findByEmail(email)
        if(!user) {
            throw new NotFoundException('Không tìm thấy người dùng')
        }
        console.log(user)
        const hashPassword = await bcrypt.hash(password,10);
        await this.userSerive.updatePW(user.id,{password: hashPassword})
        
        return {
            message: 'Đã cập nhật lại mật khẩu'
        }
    }


}
