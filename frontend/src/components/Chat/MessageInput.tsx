import React, { useState } from "react";

export default function MessageInput({
    send,
}:    {
    send: (val: string) => void 
  }) {
    const [value, setValue] = useState("")
    return (
      <>
        <input onChange={(e)=>setValue(e.target.value)} placeholder="Type Your Message" value={value} />
        <button onClick={() => send(value)}>Send</button>
      </>
    )
}