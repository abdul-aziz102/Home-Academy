import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Chat from './Chat'; // ✅ Import your real chatbot

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-indigo-700 hover:bg-indigo-800 text-white p-3 rounded-full shadow-lg cursor-pointer md:bottom-6 md:right-6"
      >
        <MessageCircle size={24} />
      </div>

      {/* Chatbot Popup Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-[360px] max-h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden md:right-6"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 text-sm font-bold flex justify-between items-center">
            AI Chatbot
          </div>

          {/* Chat Content */}
          <div className="h-[70vh] overflow-y-auto">
            <Chat />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
