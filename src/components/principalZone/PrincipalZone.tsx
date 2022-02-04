import React, { FunctionComponent, useEffect, useState } from 'react';
import { ColyseusContext } from '../../context/ColyseusContext';
import Game from '../Game/Game';
import Chat, { IMessage } from '../chat/Chat';
import * as Colyseus from 'colyseus.js';
import { Room } from 'colyseus.js';
import jwtDecode from 'jwt-decode';
import Stats from './Stats/Stats';

interface OwnProps {
  token: string;
}
const PrincipalZone: FunctionComponent<OwnProps> = ({ token }) => {
  const [room, setRoom] = useState<undefined | Promise<void | Room<unknown>>>(undefined);
  useEffect(() => {
    if (!room) {
      setRoom(
        new Colyseus.Client(WEBSOCKET_ENDPOINT)
          .joinOrCreate(ROOM_NAME, {
            token
          })
          .then((room) => {
            console.log(room.sessionId, 'joined', room.name);
            return room;
          })
          .catch((e) => {
            console.log('JOIN ERROR', e);
          })
      );
    }
  }, [token, room]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  // @ts-ignore
  const nick = jwtDecode(token).username;
  return room ? (
    <ColyseusContext.Provider
      value={{
        onlinePlayers: {},
        room: room,
        setMessages
      }}
    >
      <Stats />
      <Game setMessages={setMessages} nick={nick} />
      <Chat messages={messages} nick={nick} />
    </ColyseusContext.Provider>
  ) : (
    <div>Loading</div>
  );
};
const WEBSOCKET_ENDPOINT = 'ws://localhost:4001';
const ROOM_NAME = 'poke_world';

export default PrincipalZone;
