// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import roomReducer from '../features/room/roomSlice';
// import { socketIOMiddleware } from '../middleware/socketIOMiddleware';
import { createSocketIOMiddleware } from '../middleware/socketIOMiddleware'; // Adjust the path as necessary

const socketIOMiddleware = createSocketIOMiddleware();

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `user`, handled by `userReducer`
    user: userReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketIOMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
