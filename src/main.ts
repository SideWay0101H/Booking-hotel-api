import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'; //Thêm này cho phần statis file
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //Thêm này cho phần static file
  const config = new DocumentBuilder()
  .setTitle('Hotel Api')
  .setDescription('This is BackEnd API Booking Hotel By Le Anh Huy')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document)
  app.enableCors()
  app.useStaticAssets(join(__dirname,'../uploads'))
  app.listen(5000);
}
bootstrap();
