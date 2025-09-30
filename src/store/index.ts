import { configureStore } from '@reduxjs/toolkit';
import vmReducer from '@/store/slices/vmSlice';

export const store = configureStore({
  reducer: {
    vms: vmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
