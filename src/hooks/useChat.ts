import { useState } from "react";
import { Socket } from "socket.io-client";

interface Message {
    body: string,
    ownedByCurrentUser: boolean,
    senderId: string
}

const useChat = (socket: Socket) => {
    const [messages, setMessages] = useState<Message[]>([]);
    // useEffect(() => {
    //     socket.on("message:client", (message: Message) => {
    //         console.log("ELO WY KURWISZCZE", message)
    //         console.log(socket.id)
    //         const incomingMessage = {
    //             ...message,
    //             ownedByCurrentUser: socket.id === message.senderId
    //         }
    //         setMessages((messages: Message[]) => [...messages, incomingMessage]);
    //     })
    //
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);
    //
    // const sendMessage = (messageBody: string) => {
    //     console.log("sending msg from " + socket.id);
    //     socket.emit('message', {
    //         body: messageBody,
    //         senderId: socket.id
    //     })
    // };
    //
    // return {messages, sendMessage};
};

export default useChat;
