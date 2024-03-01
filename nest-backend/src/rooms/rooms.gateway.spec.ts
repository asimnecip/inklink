import { Test, TestingModule } from '@nestjs/testing';
import { RoomsGateway } from './rooms.gateway';
import { Server } from 'socket.io';

describe('RoomsGateway', () => {
  let gateway: RoomsGateway;
  let mockServer: Partial<Server>;
  let mockSocket: any;

  beforeEach(async () => {
    mockServer = {
      to: jest.fn(() => ({
        emit: jest.fn(),
      })) as any, // Cast to `any` to bypass detailed type checking,
    };
    mockSocket = {
      id: 'testSocketId',
      join: jest.fn(),
      emit: jest.fn(),
      leave: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsGateway],
    })
    .overrideProvider(Server)
    .useValue(mockServer)
    .compile();

    gateway = module.get<RoomsGateway>(RoomsGateway);
    gateway.server = mockServer as any;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleConnection', () => {
    it('should log client connection', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      gateway.handleConnection(mockSocket);
      expect(consoleSpy).toHaveBeenCalledWith(`Client connected: ${mockSocket.id}`);
    });
  });

  describe('handleDisconnect', () => {
    it('should remove client from rooms and log disconnection', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      // Simulate adding the client to a room before disconnecting
      const roomId = 'testRoom';
      gateway.rooms[roomId] = [mockSocket.id];
      gateway.handleDisconnect(mockSocket);
      expect(consoleSpy).toHaveBeenCalledWith(`Client disconnected: ${mockSocket.id}`);
      expect(gateway.rooms[roomId]).toBeUndefined();
    });
  });

  describe('handleCreateRoom', () => {
    it('should create a room and add the client to it', () => {
      const roomIdRegex = /^[0-9a-z]{7}$/;
      gateway.handleCreateRoom(mockSocket, {});
      const createdRoomId = Object.keys(gateway.rooms)[0];
      expect(roomIdRegex.test(createdRoomId)).toBeTruthy();
      expect(gateway.rooms[createdRoomId]).toContain(mockSocket.id);
      expect(mockSocket.emit).toHaveBeenCalledWith('room created', createdRoomId);
    });
  });

  describe('handleJoinRoom', () => {
    it('should emit error if room does not exist', () => {
      const roomId = 'nonExistingRoom';
      const joinResult = gateway.handleJoinRoom(mockSocket, roomId);
      expect(mockSocket.emit).toHaveBeenCalledWith('error', 'Room does not exist.');
    });

    it('should add client to existing room and notify room', () => {
      // First create a room
      const createRoomId = gateway.generateRoomId();
      gateway.rooms[createRoomId] = [mockSocket.id];

      // Now join the same room
      const joinResult = gateway.handleJoinRoom(mockSocket, createRoomId);
      expect(gateway.rooms[createRoomId].length).toBeGreaterThan(1);
      expect(mockServer.to).toHaveBeenCalledWith(expect.any(String)); // Checks if `to` was called with a string argument
      const emitMock = mockServer.to.mock.results[mockServer.to.mock.calls.length - 1].value.emit;
      expect(mockServer.to().emit).toHaveBeenCalledWith('user joined', mockSocket.id);
    });
  });

  // You can add more tests here for other functionalities and edge cases
});
