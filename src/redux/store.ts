import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi/authApi';
import sideMenuSlice from './sideMenuSlice/sideMenuSlice';
import { courseApi } from './courseApi/courseApi';
// import { playerApi } from './playerApi/playerApi';

export const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlice,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(courseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
