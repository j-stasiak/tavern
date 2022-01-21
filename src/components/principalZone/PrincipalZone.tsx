import React, { FunctionComponent, useState } from 'react';
import { ColyseusContext } from '../../context/ColyseusContext';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import Game from '../Game/Game';
import Chat, { IMessage } from '../chat/Chat';
import * as Colyseus from 'colyseus.js';

const PrincipalZone: FunctionComponent = (props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  return (
    <ColyseusContext.Provider
      value={{
        onlinePlayers: {},
        room: new Colyseus.Client('ws://localhost:4001')
          .joinOrCreate('poke_world', {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huZG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BEtVcDngv70orUHE1xfBUMnIyBgdcdpkH0EqI_nzF80'
          })
          .then((room) => {
            console.log(room.sessionId, 'joined', room.name);
            return room;
          })
          .catch((e) => {
            console.log('JOIN ERROR', e);
          }),
        setMessages
      }}
    >
      <SoundPlayer />
      <Game setMessages={setMessages} />
      <Chat messages={messages} />
    </ColyseusContext.Provider>
  );
};

export default PrincipalZone;
