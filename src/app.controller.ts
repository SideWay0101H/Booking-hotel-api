import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "./user/decorators/public.decorator";

@Controller()
export class AppController {
    constructor(private appService: AppService){}
    @Public()
    @Get('')
    getFunc(){
        return this.appService.getHello()
    }
}