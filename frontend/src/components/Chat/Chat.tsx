// src/components/Chat.tsx
import { useSelector } from 'react-redux';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { RoomHY } from '../../../types';

const Chat: React.FC = () => {
  // Assume messages are stored in the Redux state
  // Adjust the selector according to your state structure
  const messages = useSelector((state:RoomHY) => state.chat);

  return (
    <>
      <MessageInput />
      <Messages messages={messages}/>
    </>
  );
};

export default Chat;


// // src/components/Chat.tsx
// import React, { useState, useEffect } from 'react';
// import io, { Socket } from 'socket.io-client';
// import MessageInput from './MessageInput';
// import Messages from './Messages';

// type Message = string;

// const Chat: React.FC = () => {
//   const [socket, setSocket] = useState<Socket>()
//   const [messages, setMessages] = useState<string[]>([])

//   const send = (value: string) => {
//     socket?.emit("message", value)
//   }

//   useEffect(() => {
//     const newSocket = io('http://localhost:8001');
//     setSocket(newSocket)
//   },[setSocket])

//   const messageListener = (message: Message) => {
//     setMessages([...messages, message])
//   }
//   useEffect(() => {
//     socket?.on("message", messageListener)
//     return () => {
//       socket?.off("message", messageListener)
//     }
//   }, [messageListener])

//   return (
//     <>
//     <MessageInput send={send}/>
//     <Messages messages={messages}/>
//     </>
//   ) 

// };

// export default Chat;
