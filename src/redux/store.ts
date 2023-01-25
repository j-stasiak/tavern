import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi/authApi';
import sideMenuSlice from './sideMenuSlice/sideMenuSlice';
import { courseApi } from './courseApi/courseApi';
import { userApi } from './playerApi/userApi';
// import { playerApi } from './playerApi/playerApi';

export const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlice,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(courseApi.middleware).concat(userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
