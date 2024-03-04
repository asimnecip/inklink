import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @Column({ default: false }) // New column to indicate if the room is closed
  isClosed: boolean;
}
