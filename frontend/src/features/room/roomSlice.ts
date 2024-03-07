// src/features/roomSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomPG, RoomHY, ParticipantUser, Team, ChatMessage, JoinRoomProps, RoomState } from '../../../types';


const initialState: RoomHY = {
  id: null,
  roomId: null,
  roomName: null,
  creator: null,
  creationTime: null,
  
  userRole: null,
  userTeamId:null,
  
  users: [],
  teams: [],
  chat: [],
  canvas: null,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState:initialState,
  reducers: {
    joinRoomSlice: (
      state, 
      action: PayloadAction<JoinRoomProps>) => {
      state.roomId = action.payload.roomId
      state.roomName = action.payload.roomName
      state.userRole = action.payload.userRole
      state.userTeamId = action.payload.userTeamId
    },
    
    userJoinedRoomSlice: (
      state, 
      action: PayloadAction<ParticipantUser>) => {
        if (!state.users){
          state.users = [action.payload];
        } else {
          state.users = [...state.users, action.payload];
        }
    },
    
    setRoomStateSlice: (state, action: PayloadAction<RoomState>) => {
      state.id = action.payload.roomDetails.id;
      state.roomId = action.payload.roomDetails.roomId;
      state.creator = action.payload.roomDetails.creator;
      state.creationTime = action.payload.roomDetails.creationTime;

      state.users = action.payload.users;
      state.teams = action.payload.teams;
      state.chat = action.payload.chat;
      state.canvas = action.payload.canvas;
    },

    addMessageSlice: (state, action: PayloadAction<ChatMessage>) => {
      state.chat.push(action.payload);
    },

    updateCanvas: (state, action: PayloadAction<string>) => {
      state.canvas = action.payload;
    },


    leaveRoomSlice: (
    state, 
      action: PayloadAction<string>) => {
      state.roomId = null
      state.userRole = null
      state.userTeamId = null
    },
    userLeftSlice: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.userId !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  joinRoomSlice, 
  userJoinedRoomSlice, 

  setRoomStateSlice, 

  addMessageSlice, 
  updateCanvas,

  leaveRoomSlice,
  userLeftSlice 
} = roomSlice.actions;

export default roomSlice.reducer;
