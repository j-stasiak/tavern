import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { CHAT_SOCKET_SERVER_URL } from "../../constants/serverUrl";
import Message from "./message/Message";
import "simplebar/src/simplebar.css";
import Scrollbars from "react-custom-scrollbars";
import io from "socket.io-client";

export interface IMessage {
  body: string;
  // ownedByCurrentUser: boolean,
  senderId: string;
}

interface IProps {
  nick: string;
}

const Chat: React.FC<IProps> = ({ nick }) => {
  const [yourId, setYourId] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  const socketRef = useRef<any>();

  useEffect(() => {
    socketRef.current = io(CHAT_SOCKET_SERVER_URL);

    socketRef.current.on("your id", (id: string) => {
      console.log("mam id");
      setYourId(id);
    });

    socketRef.current.on("message:client", (message: IMessage) => {
      receivedMessage(message);
    });
  }, []);

  const receivedMessage = (message: IMessage) => {
    setMessages((oldMessages: IMessage[]) => [...oldMessages, message]);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    const messageObject: IMessage = {
      body: message,
      senderId: yourId,
    };
    setMessage("");
    socketRef.current.emit("message", messageObject);
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  console.log("id", yourId);

  return (
    <div className={"chat-container flex-container flex-justify-center"}>
      <div className="chat-window">
        <div className={"messages-container"}>
          <Scrollbars autoHide={true}>
            <div className="messages-box flex-col-container">
              {messages.map((message: IMessage, index: number) => {
                const sendByYou = message.senderId === yourId;
                return (
                  <Message
                    sendByYou={sendByYou}
                    message={message}
                    key={index}
                    nick={nick}
                  />
                );
              })}
            </div>
          </Scrollbars>
        </div>
        <div className={"chat-input flex-container flex-justify-center"}>
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Write message..."
            className="new-message-input-field"
          />
          <button className={"send-message-button"} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
