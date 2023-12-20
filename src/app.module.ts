import { Controller } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { RoomtypeModule } from './roomtype/roomtype.module';
import { PassportModule } from '@nestjs/passport';
import { ReviewModule } from './review/review.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { StripeModule } from './stripe/stripe.module';
import { BillModule } from './bill/bill.module';
import { OrderModule } from './order/order.module';
import { ResetModule } from './reset/reset.module';
import { ServicesService } from './services/services.service';
import { ServicesController } from './services/services.controller';
import { ServicesModule } from './services/services.module';
import { EventsModule } from './events/events.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' }),
  ConfigModule.forRoot({
    isGlobal: true
  }),
    StripeModule,
  TypeOrmModule.forFeature([User]),
  MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get('MAIL_HOST'),
        secure: false,
        auth: {
          user: config.get('MAIL_USER'),
          pass: config.get('MAIL_PASSWORD'),
        }
      },
      defaults: {
        from: `"No Reply" <${config.get('MAIL_FROM')}>`
      },
      template: {
        dir: join(__dirname, 'src/templates/email'),
        adapter: new HandlebarsAdapter,
        options: {
          strict: true,
        }
      }
    }),
    inject: [ConfigService]
  }),
    DatabaseModule,
    RoomModule,
    UserModule,
    AuthModule,
    RoomtypeModule,
    ReviewModule,
    StripeModule,
    BillModule,
    OrderModule,
    ResetModule,
    ServicesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },

  ],
  
})
export class AppModule { }
