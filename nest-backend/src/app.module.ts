import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsGateway } from './rooms/rooms.gateway';
import { ChatGateway } from './chat/chat.gateway';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_DB_HOST,
      port: parseInt(process.env.PG_DB_PORT, 10),
      username: process.env.PG_DB_USERNAME,
      password: process.env.PG_DB_PASSWORD,
      database: process.env.PG_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Be cautious with this in production
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoomsGateway, ChatGateway],
})
export class AppModule {}
