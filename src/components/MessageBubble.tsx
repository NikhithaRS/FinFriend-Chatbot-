import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex items-start gap-2 animate-fadeIn ${
        isUser ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-100' : 'bg-gray-100'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-blue-600" />
        ) : (
          <Bot className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div
        className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-blue-500 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}