// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPG } from '../../../types';


const initialState: UserPG = {
  id:null,
  username: null,
  walletAddress: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the username
    setUser: (state, action: PayloadAction<UserPG>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.walletAddress = action.payload.walletAddress;
    },
  },
});

// Export the action
export const { setUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
