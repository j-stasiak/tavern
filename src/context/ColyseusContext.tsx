import React, { createContext } from 'react';
import * as Colyseus from 'colyseus.js';

export interface ColyseusState {
  room: Promise<void | Colyseus.Room<unknown>>;
  onlinePlayers: any;
  setMessages: any;
}

export const ColyseusContext = createContext<any>({
  onlinePlayers: {},
  room: undefined,
  setMessages: () => {
    console.log("this shouldnt' happen?");
  }
});

export const useColyseus = () => React.useContext<ColyseusState>(ColyseusContext);
