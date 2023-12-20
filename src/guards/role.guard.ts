import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean  {
    console.log('vao roleguard')
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles',[
      context.getHandler(),
      context.getClass()
    ])

    if(!requiredRoles){
      return true
    }
    console.log("RequiredRoles",requiredRoles)
    const {user} = context.switchToHttp().getRequest()
    console.log("user =>",user)
    //Some chạy qua các phần tử trong mảng của roles nếu có 1 roles là admin thỏa mãn điều kiện
    return requiredRoles.some(role => user.roles.split(',').includes(role))
  }
}