import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi/authApi';
import sideMenuSlice from './sideMenuSlice/sideMenuSlice';

export const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlice,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
