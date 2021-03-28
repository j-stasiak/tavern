import React, { useEffect, useState } from "react";
import { IMessage } from "../Chat";
import "./Message.scss";
import axios from "axios";
import { SERVER_URL } from "../../../constants/endpoints";
import useSound from "use-sound";

interface IProps {
  sendByYou: boolean;
  message: IMessage;
  nick: string;
}

const Message: React.FC<IProps> = ({ sendByYou, message, nick }) => {
  const [reputation, setPlayerReputation] = useState(0);
  const [playSound, { isPlaying }] = useSound("sounds/like_sound.mp3", {
    volume: 0.2,
  });
  const likeMessage = (likedUserNick: string) => {
    axios.get(`${SERVER_URL}/user/${likedUserNick}`).then((result) => {
      setPlayerReputation(result.data.reputation + 1);
      axios
        .put(`${SERVER_URL}/user/${likedUserNick}`, {
          reputation: result.data.reputation + 1,
        })
        .then(() => {
          if (!isPlaying) {
            playSound();
          }
        });
    });
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios.get(`${SERVER_URL}/user/${message.nick}`).then((result) => {
  //       setPlayerReputation(result.data.reputation);
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <>
      <p
        onClick={() => nick !== message.nick && likeMessage(message.nick)}
        className={`message ${sendByYou ? "my-message" : "received-message"}`}
      >
        {`[${message.nick}]${reputation !== 0 ? `(${reputation})` : ""}: ${
          message.body
        }`}
      </p>
    </>
  );
};

export default Message;
