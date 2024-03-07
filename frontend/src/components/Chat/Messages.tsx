import React from "react";
import { ChatMessage } from "../../../types";

export default function Messages({ messages }: { messages: ChatMessage[] }) {
    return (
        <div>
            {messages.map((message, index) => (
                <div key={index} className="message">
                <span>{message.senderName}: </span>
                <span>{message.text}</span>
              </div>
        ))}
        </div>
    )
}