import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-600'
      }`}>
        {isUser ? <MessageSquare className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div className={`flex-1 px-4 py-2 rounded-lg ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}>
        {message.content}
      </div>
    </div>
  );
}