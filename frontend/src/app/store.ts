// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import roomReducer from '../features/rooms/roomSlice';

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `user`, handled by `userReducer`
    user: userReducer,
    room: roomReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
