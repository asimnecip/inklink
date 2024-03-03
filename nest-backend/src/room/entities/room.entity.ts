// src/rooms/room.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  roomId: string;

  @Column()
  roomName: string;

  @Column()
  creator: string;

  @CreateDateColumn()
  creationTime: Date;
}
