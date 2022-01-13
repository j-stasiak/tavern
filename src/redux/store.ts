import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './authApi/loginApi';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
