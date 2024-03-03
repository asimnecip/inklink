import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';

type Point = { x: number; y: number };

type DrawLine = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

@WebSocketGateway(5555, {
  cors: {
    origin: '*',
  },
})
export class CanvasGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private redisService: RedisService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Optionally handle room joining here or in a separate event
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    const { roomId } = data;
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);

    // const savedState = await this.redisService.get(`canvasState:${roomId}`);
    // if (savedState) {
    //   console.log("ifte");
    //   this.server.to(roomId).emit('canvas-state-from-server', JSON.parse(savedState));
    //   } else {
        this.server.to(roomId).emit('get-canvas-state');
        console.log("elsete");
    // }
  }

  // @SubscribeMessage('client-ready')
  // handleClientReady(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
  //   const { roomId } = data;
  //   // Emit to all clients in the room except the sender
  //   this.server.to(roomId).emit('get-canvas-state');
  // }

  @SubscribeMessage('canvas-state')
  async handleCanvasState(
        @ConnectedSocket() client: Socket, 
        @MessageBody() data: { roomId: string, state: string }) {

    console.log(`Received canvas state for room ${data.roomId}`);

    const { roomId, state } = data;
    if (!roomId) {
      console.error('roomId is undefined in handleCanvasState', data);
      return;
    }
    
    console.log(`Saving state for room ${roomId}`);
    await this.redisService.set(`canvasState:${roomId}`, JSON.stringify(state));
    this.server.to(roomId).emit('canvas-state-from-server', state);
  }

  @SubscribeMessage('draw-line')
  handleDrawLine(@ConnectedSocket() client: Socket, @MessageBody() data: DrawLine & { roomId: string }) {
    const { roomId } = data;
    // Emit to all clients in the room except the sender
    this.server.to(roomId).emit('draw-line', data);
  }

  @SubscribeMessage('clear')
  async handleClear(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    const { roomId } = data;
    this.server.to(roomId).emit('clear');
    await this.redisService.set(`canvasState:${roomId}`, "");
    this.server.to(roomId).emit('canvas-state-from-server', "");    
  }
  // @SubscribeMessage('leave-room')
  // async handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
  //   const { roomId } = data;
  //   const result = await this.redisService.del(`canvasState:${roomId}`);
  //   console.log(`${result} key(s) removed.`);
  // }
}
