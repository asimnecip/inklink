import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CanvasGateway } from './canvas/canvas.gateway';
import { RedisModule } from './redis/redis.module';
import { RoomModule } from './room/room.module';


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
    RedisModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, CanvasGateway],
})
export class AppModule {}
