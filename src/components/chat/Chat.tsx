import React, { useState } from 'react';
import Message from './message/Message';
import Scrollbars from 'react-custom-scrollbars';
import { useColyseus } from '../../context/ColyseusContext';
import { Button, TextareaAutosize } from '@mui/material';
import classNames from 'classnames';
import flex from '../../styles/flex.module.scss';
import SendIcon from '@mui/icons-material/Send';
import { texts } from '../../texts';
import styled from 'styled-components';
import { CALICO, TOBACCO } from '../../colors';

export interface IMessage {
  message: string;
  nick: string;
}

interface IProps {
  messages: IMessage[];
  nick: string;
}

const Chat: React.FC<IProps> = ({ messages, nick }) => {
  const [message, setMessage] = useState<string>('');
  const { room } = useColyseus();

  const sendMessage = (e: any) => {
    e.preventDefault();
    const messageObject: IMessage = {
      message: message,
      nick
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

  const ChatContainer = styled.div`
    height: 814px;
    margin-left: 16px;
    width: 360px;
    display: grid;
    grid-template-rows: 12fr 2fr 1fr;
    grid-gap: 5px;
  `;

  const ChatWindow = styled.div`
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    border-radius: 20px;
    padding: 10px;
  `;

  const ScrollbarWrapper = styled.div`
    width: 100%;
    height: 100%;
  `;

  const MessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  `;

  const NewMessage = styled(TextareaAutosize)`
    height: 100%;
    padding: 8px;
    background-color: transparent;
    color: ${CALICO};
    font-size: 1.2rem;

    &::placeholder {
      color: ${CALICO};
    }
  `;

  return (
    <ChatContainer>
      <ChatWindow>
        <ScrollbarWrapper>
          <Scrollbars autoHide={true}>
            <MessagesWrapper>
              {messages.map((message: IMessage, index: number) => {
                const sendByYou = message.nick === nick;
                return <Message sendByYou={sendByYou} message={message} key={index} nick={nick} />;
              })}
            </MessagesWrapper>
          </Scrollbars>
        </ScrollbarWrapper>
      </ChatWindow>
      <div className={classNames(flex.flexColContainer, flex.justifyCenter)}>
        <NewMessage onChange={handleChange} minRows={5} placeholder={texts.chat.speak} value={message} />
      </div>
      <Button variant="contained" className={'send-message-button'} onClick={sendMessage}>
        <SendIcon style={{ color: `${TOBACCO}` }} />
      </Button>
    </ChatContainer>
  );
};

export default Chat;
