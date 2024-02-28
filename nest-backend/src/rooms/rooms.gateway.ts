import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    rooms: { [key: string]: string[] } = {}; // RoomID to list of SocketIDs

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        // Remove the client from all rooms
        Object.keys(this.rooms).forEach(roomId => {
            this.rooms[roomId] = this.rooms[roomId].filter(socketId => socketId !== client.id);
            if (this.rooms[roomId].length === 0) {
                delete this.rooms[roomId];
            }
        });
    }

    @SubscribeMessage('create room')
    handleCreateRoom(client: Socket, payload: any): void {
        const roomId = this.generateRoomId();
        this.rooms[roomId] = [client.id];
        client.join(roomId);
        client.emit('room created', roomId);
    }

    @SubscribeMessage('join room')
    handleJoinRoom(client: Socket, roomId: string): boolean {
        if (!this.rooms[roomId]) {
            return client.emit('error', 'Room does not exist.');
        }
        this.rooms[roomId].push(client.id);
        client.join(roomId);
        this.server.to(roomId).emit('user joined', client.id);
    }

    generateRoomId(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}
