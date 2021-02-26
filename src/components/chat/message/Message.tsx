import React from "react";
import { IMessage } from "../Chat";
import "./Message.scss";

interface IProps {
  sendByYou: boolean;
  message: IMessage;
  nick: string;
}

const Message: React.FC<IProps> = ({ sendByYou, message, nick }) => (
  <>
    {/*<p>{sendByYou ? 'Ty:' : nick}</p>*/}
    <p className={`message ${sendByYou ? "my-message" : "received-message"}`}>
      {message.body}
    </p>
  </>
);

export default Message;
