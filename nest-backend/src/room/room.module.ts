// src/rooms/rooms.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';
import { RoomGateway } from './room.gateway';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), RedisModule],
  providers: [RoomService, RoomGateway],
  controllers: [RoomController],
})
export class RoomModule {}
