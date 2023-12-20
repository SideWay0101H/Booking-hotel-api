import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Query, Req, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { CreateUserDTO } from "./dto/createUser.dto";
import { FilterUserDTO } from "./dto/fliter-user.dto";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { Roles } from "./decorators/role.decorators";
import { storageConfig } from "src/helpers/confg";
// import { AuthGuard } from "src/guards/auth.guard";
import { Public } from 'src/user/decorators/public.decorator';
import { ResetPasswordDTO } from "./dto/resetpassword.dto";
@ApiBearerAuth()
@ApiTags('Users')
@Controller('v1/users')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Roles('Manager')
    // @Public()
    @Get()
    getAllUser(@Query() query: FilterUserDTO): Promise<User[]> {
            console.log(query)
            return this.userService.findAll(query)
        }
    
    

    @Roles('Manager')
    @Get('profile')
    profile(@Req() req:any):Promise<User>{
        return this.userService.findOne(Number(req.user_data.id))
    }

    
    @Roles('Manager')
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: string): Promise<User> {
        return this.userService.findOne(Number(id))
    }

    @Roles('Manager')
    @Post()
    create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return this.userService.create(createUserDTO)
    }
    /**
     * 
     * @param id 
     * @param updateUserDTO 
     * @returns 
     * Edit thông tin người dùng
     */
    @Roles('Manager','Guest')
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDTO: UpdateUserDTO,) {
        return this.userService.update(Number(id), updateUserDTO)
    }

    @Put('change-password/:id')
    changePassword(@Param('id',ParseIntPipe) id: string,@Body() passwordDto: ResetPasswordDTO){
        console.log(passwordDto)
        return this.userService.updatePW(Number(id),passwordDto)
    }

    @Roles('Manager')
    @Delete('multiple')
    multipleDelete(@Query('ids' ,new ParseArrayPipe({items:String, separator: ','})) ids: string[]){
        console.log("delete multi =>",ids)
        return this.userService.multipleDelete(ids)
    }

    @Roles('Manager')
    @Delete(':id')
    deleteUser(
        @Param(':id') id: string) {
        return this.userService.delete(Number(id))
    }

    @Roles('Manager')
    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar',{ 
            storage: storageConfig('avatar'),
            fileFilter: (req,file,cb) =>{
                const ext = extname(file.originalname)
                const allowExtArr = ['.jpg', '.png', '.jpeg']
                if(!allowExtArr.includes(ext)){
                    req.fileValidationError = `Wrong extension type. Accpected file ext are: ${allowExtArr.toString()}`
                    cb(null,false)
                }else {
                    const fileSize = parseInt(req.headers['content-length'])
                    if(fileSize > 1024 * 1024 * 5){
                        req.fileValidationError = 'File size is too large. Accpeted file size is less than 5 MB';
                        cb(null,false)
                    }else {
                        cb(null,true)
                    }
                }
            }
        }
    ))
     uploadAvatar(@Req() req:any, @UploadedFile() file: Express.Multer.File){
        console.log('Upload avatar')
        console.log('User data',req['user_data'].id)
        console.log(file)
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException("File is required")
        }
        return this.userService.updateAvatar(req.user_data.id,file.fieldname + '/' + file.filename)
    }
                                                     
    
}