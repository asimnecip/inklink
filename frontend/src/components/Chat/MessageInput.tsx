// components/ChatInput.tsx
import React, { useState } from 'react';
import { sendChatMessage } from '../../middleware/socketIOMiddleware'; // adjust path as necessary
import { useDispatch } from 'react-redux';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    dispatch(sendChatMessage(message));

    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;



// import React, { useState } from "react";

// export default function MessageInput({
//     send,
// }:    {
//     send: (val: string) => void 
//   }) {
//     const [value, setValue] = useState("")
//     return (
//       <>
//         <input onChange={(e)=>setValue(e.target.value)} 
//         placeholder="Type Your Message" value={value} />
//         <button onClick={() => send(value)}>Send</button>
//       </>
//     )
// }
