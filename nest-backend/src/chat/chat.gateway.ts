import { 
  MessageBody,
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
  } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8001,  { cors: "*"})
export class ChatGateway {
  // @WebSocketServer() server: Server;
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message:string): void {
    console.log(message);
    this.server.emit('message', message);
  }
}
