import { useState } from 'react';
import { io } from 'socket.io-client';

type Socket = ReturnType<typeof io>;

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();
  return {
    socket,
    setSocket
  };
};
