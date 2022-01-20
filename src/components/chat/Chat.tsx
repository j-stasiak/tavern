import React, { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import Message from './message/Message';
import Scrollbars from 'react-custom-scrollbars';
import { useColyseus } from '../../context/ColyseusContext';

export interface IMessage {
  body: string;
  nick: string;
}

interface IProps {
  nick: string;
}

const Chat: React.FC<IProps> = ({ nick }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const { room } = useColyseus();
  const socketRef = useRef<any>();

  useEffect(() => {
    //TODO below code will be changed when socket changes get implemented. It's bad
    room.then((room) => {
      room?.onMessage('CURRENT_PLAYERS', (data) => {
        Object.keys(data.players).forEach((playerId) => {
          const player = data.players[playerId];
          receivedMessage({ body: 'Siema', nick: playerId });
        });
      });
      room?.onMessage('PLAYER_JOINED', (data) => {
        receivedMessage({ body: 'Siema', nick: data.sessionId });
      });
    });
    /* socketRef.current = io(SERVER_SOCKET_URL);

    socketRef.current.on("message:client", (message: IMessage) => {
      receivedMessage(message);
    })*/
  }, []);

  const receivedMessage = (message: IMessage) => {
    setMessages((oldMessages: IMessage[]) => [...oldMessages, message]);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    const messageObject: IMessage = {
      body: message,
      nick: nick
    };
    setMessage('');
    socketRef.current.emit('message', messageObject);
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <div className={'chat-container flex-container flex-justify-center'}>
      <div className="chat-window">
        <div className={'messages-container'}>
          <Scrollbars autoHide={true}>
            <div className="messages-box flex-col-container">
              {messages.map((message: IMessage, index: number) => {
                const sendByYou = message.nick === nick;
                return <Message sendByYou={sendByYou} message={message} key={index} nick={nick} />;
              })}
            </div>
          </Scrollbars>
        </div>
        <div className={'chat-input flex-container flex-justify-center'}>
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="No mówże!"
            className="new-message-input-field"
          />
          <button className={'send-message-button'} onClick={sendMessage}>
            Mów
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
