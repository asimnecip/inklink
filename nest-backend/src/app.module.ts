import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsGateway } from './rooms/rooms.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RoomsGateway],
})
export class AppModule {}
