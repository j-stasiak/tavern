import React, { createContext } from 'react';
import { onlinePlayers, room } from '../phaser/SocketServer';
import * as Colyseus from 'colyseus.js';

export interface ColyseusState {
  room: Promise<void | Colyseus.Room<unknown>>;
  onlinePlayers: any;
}

export const ColyseusContext = createContext<any>({
  onlinePlayers,
  room
});

export const useColyseus = () => React.useContext<ColyseusState>(ColyseusContext);
