import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomsService: RoomService) {}

  @Post()
  createRoom(@Body() createRoomDto: { roomName: string; creator: string }): Promise<Room> {
    return this.roomsService.createRoom(createRoomDto.roomName, createRoomDto.creator);
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Patch(':roomId/close') // New endpoint to close a room
  closeRoom(@Param('roomId') roomId: string): Promise<void> {
    return this.roomsService.closeRoom(roomId);
  }
  
  @Get('active')
  findNotClosedRooms(): Promise<Room[]> {
    return this.roomsService.findNotClosedRooms();
  }

}
