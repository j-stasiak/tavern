import React, { FunctionComponent, useEffect, useState } from 'react';
import { ColyseusContext } from '../../context/ColyseusContext';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import Game from '../Game/Game';
import Chat, { IMessage } from '../chat/Chat';
import * as Colyseus from 'colyseus.js';
import { Room } from 'colyseus.js';

interface OwnProps {
  token: string;
}
const PrincipalZone: FunctionComponent<OwnProps> = ({ token }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [room, setRoom] = useState<undefined | Promise<void | Room<unknown>>>(undefined);
  //TODO is that event legit in react?
  useEffect(() => {
    if (!room) {
      setRoom(
        new Colyseus.Client('ws://localhost:4001')
          .joinOrCreate('poke_world', {
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

  return room ? (
    <ColyseusContext.Provider
      value={{
        onlinePlayers: {},
        room: room,
        setMessages
      }}
    >
      <SoundPlayer />
      <Game setMessages={setMessages} />
      <Chat messages={messages} />
    </ColyseusContext.Provider>
  ) : (
    <div>Loading</div>
  );
};

export default PrincipalZone;
