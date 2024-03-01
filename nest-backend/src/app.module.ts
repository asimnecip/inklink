import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsGateway } from './rooms/rooms.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AppController],
  providers: [AppService, RoomsGateway, ChatGateway],
})
export class AppModule {}
