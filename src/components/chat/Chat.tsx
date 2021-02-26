import React, { useEffect, useRef, useState } from "react";
import './Chat.scss'
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../../constants/serverUrl";


interface Message {
    body: string,
    // ownedByCurrentUser: boolean,
    senderId: string
}

const Chat = () => {
    const [yourId, setYourId] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState<string>('')

    const socketRef = useRef<Socket>();

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL);

        socketRef.current.on("your id", (id: string) => {
         setYourId(id);
        })

        socketRef.current.on("message:client", (message: Message) => {
            receivedMessage(message);
        })
    }, [])

    const receivedMessage = (message: Message) => {
        setMessages((oldMessages: Message[]) => [...oldMessages, message])
    }

    const sendMessage = (e: any) => {
        e.preventDefault();
        const messageObject: Message = {
            body: message,
            senderId: yourId
        }
        setMessage('');
        // @ts-ignore
        socketRef.current.emit("message", messageObject)
    }

    const handleChange = (e: any) => {
        setMessage(e.target.value);
    }

    return (
        <div className={"glass"}>
            {messages.map((message: Message, index: number) => {
                    if (message.senderId === yourId) {
                        return <p style={{color: "white"}}>Ty: {message.body}</p>
                    }
                    return <p style={{color: "red"}}>{message.body}</p>
                }
            )}
             <textarea
                value={message}
                onChange={handleChange}
                placeholder="Write message..."
                className="new-message-input-field"
            />
            <button onClick={sendMessage} className="send-message-button">
                Send
            </button>
        </div>
    );
};

export default Chat;
