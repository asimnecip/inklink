import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../../types'; // Adjust the import path as necessary

interface RoomState {
    currentRoom: Room | null;
  }
  
  const initialState: RoomState = {
    currentRoom: null,
  };
  
  export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
      setCurrentRoom: (state, action: PayloadAction<Room>) => {
        state.currentRoom = action.payload;
      },
    },
  });
  
  export const { setCurrentRoom } = roomSlice.actions;
  
  export default roomSlice.reducer;
