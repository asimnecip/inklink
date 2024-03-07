import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';
import { RoomService } from './room.service';

type Point = { x: number; y: number };

type DrawLine = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

@WebSocketGateway(7000, {
  cors: {
    origin: '*',
  },
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private redisService: RedisService,
    private roomService: RoomService
    ) {}

  // Basic
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }


  // Room Feature

  @SubscribeMessage('ss/userJoinedRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket, 
    @MessageBody() data: { 
      roomId: string, 
      userId:number | null,
      userName:string,
      userRole:string,
      userTeamId:number,
      }) {
    

    const { roomId, userId, userName, userRole, userTeamId } = data;

    client.join(roomId);

    await this.roomService.addUserToRoom(
      roomId, 
      userId,
      userName,
      userRole,
      userTeamId,
      );
    
    this.server.to(roomId).emit('cs/userJoinedRoom');
    
    const roomState = await this.roomService.getRoomState(roomId);
    client.emit('cs/roomState', roomState);

    // const savedCanvasState = await this.redisService.get(`canvasState:${roomId}`);
    // console.log(Boolean(savedCanvasState));
    // if (savedCanvasState) {
    //   console.log("ifte");
    //   this.server.to(roomId).emit('canvas-state-from-server', JSON.parse(savedCanvasState));
    //   } else {
        // console.log("elsete");
    // }
  }

  @SubscribeMessage('ss/leaveRoom')
  async handleLeaveRoom(client: Socket, payload: { roomId: string; userId: string }) {
    const { roomId, userId } = payload;

    // Remove the client from the room
    client.leave(roomId);

    // Remove user from Redis
    await this.roomService.removeUserFromRoom(roomId, userId);

    // Notify others in the room that a user has left
    this.server.to(roomId).emit('cs/userLeftRoom', { userId });
  }

  // Canvas Featurre

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
    this.server.to(roomId).emit('canvas-state-from-server', data);
  }

  @SubscribeMessage('draw-line')
  handleDrawLine(@ConnectedSocket() client: Socket, @MessageBody() data: DrawLine & { roomId: string }) {
    const { roomId } = data;
    // Emit to all clients in the room except the sender
    this.server.to(roomId).emit('draw-line', data);
  }

  @SubscribeMessage('clear-canvas')
  async handleClear(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    const { roomId } = data;
    await this.redisService.set(`canvasState:${roomId}`, null);
    this.server.to(roomId).emit('canvas-state-from-server', null);    
  }


  // Chat Feature


  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    client: Socket, 
    payload: { 
      roomId: string; 
      userId:number, 
      message: string 
    }) {
    const { 
      roomId,
      userId,
      message } = payload;

    // Add chat message to Redis
    await this.roomService.addChatMessage(roomId, userId, message);

    // Broadcast message to all users in the room
    this.server.to(roomId).emit('chat-message', message);
  }


}
