import React from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '../../types/chat';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, onSendMessage }) => (
  <div className="bg-white rounded-lg shadow-md">
    <div className="h-[600px] overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
    <div className="border-t p-4">
      <ChatInput onSend={onSendMessage} />
    </div>
  </div>
);