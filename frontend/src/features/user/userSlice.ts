// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the username
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// Export the action
export const { setUsername } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
