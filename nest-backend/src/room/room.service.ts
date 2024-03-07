import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Redis from 'ioredis';
import { Room } from './entities/room.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RoomService {
  constructor(
    
    @Inject(RedisService) private readonly redis: Redis,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async createRoom(roomName: string, creator: string): Promise<Room> {
    const newRoom = this.roomRepository.create({ roomName, creator });
    return this.roomRepository.save(newRoom);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }
  async closeRoom(roomId: string): Promise<void> {
    const room = await this.roomRepository.findOneBy({ roomId });
    if (!room) {
      throw new Error('Room not found');
    }
    room.isClosed = true;
    await this.roomRepository.save(room);
  }

  async findNotClosedRooms(): Promise<Room[]> {
    return this.roomRepository.find({ where: { isClosed: false } });
  }

  async addUserToRoom(
    roomId: string, 
    userId: number, 
    userName: string, 
    userRole: string, 
    userTeamId: number | null 
      ): Promise<void> {
    const userKey = `room:${roomId}:users`;
    const userVal = JSON.stringify({
      userName, userRole, userTeamId
    })
    await this.redis.hset(userKey, userId, userVal);
  }

  async removeUserFromRoom(roomId: string, userId: string): Promise<void> {
    const userKey = `room:${roomId}:users`;
    const removed = await this.redis.hdel(userKey, userId);
    console.log(`IS REMOVED: ${removed}`);
  }

  async addTeamToRoom(roomId: string, teamId: number, teamName: string): Promise<void> {
    const teamKey = `room:${roomId}:teams`;
    await this.redis.hset(teamKey, teamId.toString(), JSON.stringify({ id: teamId, name: teamName }));
  }

  async getRoomState(roomId: string): Promise<any> {
    const userKey = `room:${roomId}:users`;
    const teamKey = `room:${roomId}:teams`;
    const chatKey = `room:${roomId}:chat`;
    const canvasKey = `room:${roomId}:canvas`;
    const roomDetails = await this.roomRepository.findOneBy({ roomId: roomId });

    // Fetch all users
    const users = await this.redis.hgetall(userKey);
    // Transform users into a more usable format
    const transformedUsers = Object.keys(users).map((userId) => ({
      userId,
      ...JSON.parse(users[userId]),
    }));

    // Fetch all teams
    const teams = await this.redis.hgetall(teamKey);
    // Transform teams into a more usable format
    const transformedTeams = Object.keys(teams).map((teamId) => JSON.parse(teams[teamId]));

    // Fetch chat messages
    const chatMessages = await this.redis.lrange(chatKey, 0, -1);
    const transformedChatMessages = chatMessages.map((msg) => JSON.parse(msg));

    // Fetch canvas state
    const canvasState = await this.redis.get(canvasKey);

    return {
      roomDetails,
      users: transformedUsers,
      teams: transformedTeams,
      chat: transformedChatMessages,
      canvas: JSON.parse(canvasState || '{}'),
    };
  }

  async addChatMessage(roomId: string, userId:number, message: string): Promise<void> {
    const datetime = new Date().toISOString();

    const chatKey = `room:${roomId}:chat`;
    const chatVal = {
      userId, // Add userId
      datetime, // Add datetime
      message, // Spread the existing message properties
    };

    await this.redis.rpush(chatKey, JSON.stringify(chatVal));
  }

  async setCanvasState(roomId: string, canvasState: object): Promise<void> {
    const canvasKey = `room:${roomId}:canvas`;
    await this.redis.set(canvasKey, JSON.stringify(canvasState));
  }
  
}
