import React, { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import Message from './message/Message';
import Scrollbars from 'react-custom-scrollbars';
import { useColyseus } from '../../context/ColyseusContext';
import { Button, TextareaAutosize } from '@mui/material';
import classNames from 'classnames';
import flex from '../../styles/flex.module.scss';
import SendIcon from '@mui/icons-material/Send';

export interface IMessage {
  message: string;
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
      //@ts-ignore
      room.state.messages.onAdd = (m, _) => {
        console.log('Message added!');
        setMessages([...messages, { message: m.message, nick: m.nick }]);
      };
      setMessages(
        //@ts-ignore
        room.state.messages.map((m) => {
          return {
            message: m.message,
            nick: m.nick,
            date: m.date
          };
        })
      );
    });
    /* socketRef.current = io(SERVER_SOCKET_URL);

    socketRef.current.on("message:client", (message: IMessage) => {
      receivedMessage(message);
    })*/
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const receivedMessage = (message: IMessage) => {
    setMessages((oldMessages: IMessage[]) => [...oldMessages, message]);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    const messageObject: IMessage = {
      message: message,
      nick: nick
    };
    setMessage('');
    room.then((room) => {
      //@ts-ignore
      room.send('MESSAGE_SENT', messageObject);
    });
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <div className={classNames('chat-container')}>
      <div className="chat-window">
        <div className={'messages-container'}>
          <Scrollbars autoHide={true}>
            <div className={classNames('messages-box', flex.flexColContainer)}>
              {messages.map((message: IMessage, index: number) => {
                const sendByYou = message.nick === nick;
                return <Message sendByYou={sendByYou} message={message} key={index} nick={nick} />;
              })}
            </div>
          </Scrollbars>
        </div>
      </div>
      <div className={classNames('chat-input', flex.flexColContainer, flex.justifyCenter)}>
        <TextareaAutosize
          onChange={handleChange}
          minRows={5}
          placeholder="No mówże!"
          className="new-message-input-field"
          value={message}
        />
      </div>
      <Button variant="contained" className={'send-message-button'} onClick={sendMessage}>
        <SendIcon className={'send-button'} />
      </Button>
    </div>
  );
};

export default Chat;
