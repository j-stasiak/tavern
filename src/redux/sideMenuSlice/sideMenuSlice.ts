import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouteEnum } from '../../enums/RouteEnum';

interface sideMenuState {
  path: RouteEnum;
}

const initialState = { path: RouteEnum.Home } as sideMenuState;

const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    routeToPath(state, action: PayloadAction<RouteEnum>) {
      state.path = action.payload;
    }
  }
});

export const { routeToPath } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
