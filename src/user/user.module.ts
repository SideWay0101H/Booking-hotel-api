import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User]),
          ],
  controllers: [UserController],
  providers: [UserService,],
})
export class UserModule {}
