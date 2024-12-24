import { useState } from 'react';
import { Message } from '../types/chat';
import { processChat } from '../utils/chatProcessor';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome! I can help you calculate energy production, incentives, and funding for your solar farm. Are you a non-profit or for-profit? Please provide your location (address, city, state, ZIP) and acreage to get started.",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);

  const sendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      
      // Process the chat and generate response
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: processChat(updatedMessages),
        role: 'assistant',
        timestamp: new Date(),
      };
      
      return [...updatedMessages, response];
    });
  };

  return { messages, sendMessage };
};