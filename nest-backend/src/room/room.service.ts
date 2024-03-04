import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async createRoom(roomName: string, creator: string): Promise<Room> {
    const newRoom = this.roomsRepository.create({ roomName, creator });
    return this.roomsRepository.save(newRoom);
  }

  async findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }
  async closeRoom(roomId: string): Promise<void> {
    const room = await this.roomsRepository.findOneBy({ roomId });
    if (!room) {
      throw new Error('Room not found');
    }
    room.isClosed = true;
    await this.roomsRepository.save(room);
  }

  async findNotClosedRooms(): Promise<Room[]> {
    return this.roomsRepository.find({ where: { isClosed: false } });
  }
  
}
