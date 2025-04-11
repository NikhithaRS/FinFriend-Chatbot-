import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-gray-500 animate-fadeIn">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }} />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }} />
      </div>
      <span className="text-sm">FinFriend is typing...</span>
    </div>
  );
}