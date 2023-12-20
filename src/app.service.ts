import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService{
    getHello(){
        return 'Hello world, Api build with Nestjs And Postgresql'
    }
}