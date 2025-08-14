// ChatbotWidget.jsx
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Chat from './Chat';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white py-3 px-4 rounded-full shadow-lg cursor-pointer md:bottom-6 md:right-6"
      >
        <MessageCircle size={22} />
        <span className="hidden sm:inline text-sm font-medium">
          Ask Something From AI
        </span>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-[360px] max-h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 text-sm font-bold flex justify-between items-center">
            AI Chatbot
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto">
            <Chat />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
