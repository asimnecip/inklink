// src/middleware/socketIOMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import io, { Socket } from 'socket.io-client';
import { JoinRoomProps } from '../../types';
import { 
  joinRoomSlice, 
  userJoinedRoomSlice, 

  addMessageSlice, 
  setRoomStateSlice, 

  userLeftSlice,
  leaveRoomSlice,
} from '../features/room/roomSlice';

// Define action types
const SOCKET_CONNECT = 'cs/connect';
const SOCKET_SEND_MESSAGE = 'cs/sendMessage';
const SOCKET_JOIN_ROOM = 'cs/joinRoom';
const SOCKET_LEAVE_ROOM = 'cs/leaveRoom';
const SOCKET_CANVAS_ACTION = 'cs/canvasAction';

export const createSocketIOMiddleware = (): Middleware => {
  let socket: Socket | null = null;

  return store => next => (action:any) => {
    switch (action.type) {
      case SOCKET_CONNECT:
        if (socket !== null) {
          socket.disconnect();
        }
        socket = io(action.payload);
        socket.on("cs/userJoinedRoom", (data) => {
          store.dispatch(userJoinedRoomSlice(data));
        });

        socket.on("cs/roomState", (data) => {
          store.dispatch(setRoomStateSlice(data));
        });

        socket.on("cs/chatMessage", (message) => {
          store.dispatch(addMessageSlice(message));
        });

        socket.on("cs/userLeftRoom", (data) => {
          const { userId } = data;
          console.log(userId);
          store.dispatch(userLeftSlice(userId));
        });

        break;
      case SOCKET_JOIN_ROOM:
        store.dispatch(joinRoomSlice(action.payload));
        socket?.emit("ss/userJoinedRoom", action.payload);
        break;
      case SOCKET_SEND_MESSAGE:
        socket?.emit("ss/chatMessage", action.payload);
        break;
      case SOCKET_CANVAS_ACTION:
        socket?.emit("canvasAction", action.payload);
        break;

      case SOCKET_LEAVE_ROOM:
        store.dispatch(leaveRoomSlice(action.payload));
        socket?.emit('ss/leaveRoom', action.payload); // Optional: Implement leave-room logic on server
        break;

      default:
        return next(action);
    }
  };
};

// Action creators
export const connectSocket = (url: string) => ({
  type: SOCKET_CONNECT,
  payload: url,
});

export const userJoinedRoomAct = (data: JoinRoomProps) => ({
  type: SOCKET_JOIN_ROOM,
  payload: data,
});

export const sendChatMessage = (message: string) => ({
  type: SOCKET_SEND_MESSAGE,
  payload: message,
});

export const canvasAction = (actionData: any) => ({
  type: SOCKET_CANVAS_ACTION,
  payload: actionData,
});

export const leaveRoomAct = (data: object) => ({
  type: SOCKET_LEAVE_ROOM,
  payload: data,
});

// Listener Action Creators

