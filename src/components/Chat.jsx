// Chat.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 📌 Full Academy Data for Context
  const portfolioContext = `
  Center Name: Home Academy
  Address: Abdullah Apartment, New Kumharwara, Near Spicy Corner, Lyari, Karachi
  Contact Numbers: 0332-3769179, 0332-2449008
  Email: homeacademy.lyari@gmail.com
  Levels: Pre-beginning, Beginning, Level One, Level Two, Level Three, Level Four, Level Five, Level Advanced
  Teachers:
    Principal: Sir Nameem
    Sir Yasran Jan
    Sir Meboob
    Sir Hafeez
    Sir Ateeq-ur-Rehman
    Sir Abdul Rehman
    Sir Abid Nihal
    Sir Naeem
    Sir Naveed
  Established: 1999
  Hello: Hello! How can I help you? You can ask any question about Home Academy 🥰.
  Environment:
    - Long-standing since 1999, stable and experienced in education.
    - Structured learning with multiple levels and dedicated staff.
    - Located in a community-based area in Lyari.
  Teacher Behaviour:
    - Professional and committed educators.
    - Many years of teaching experience.
  `;

  const cleanAndFormatText = (text) =>
    text.replace(/#+\s?/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*/g, "•").trim();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const generateAnswer = async () => {
    if (!question.trim()) return;

    const userMessage = { text: question, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAtl06jWeRssYK2pvnsl8D5lrpPvq8vomg",
        {
          contents: [{ parts: [{ text: `${portfolioContext}\nUser: ${question}` }] }],
        }
      );

      const rawText = response.data.candidates[0].content.parts[0].text;
      const formattedText = cleanAndFormatText(rawText);

      setMessages((prev) => [...prev, { text: formattedText, sender: "ai" }]);
    } catch {
      setMessages((prev) => [...prev, { text: "❌ Failed to get answer. Please try again.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-md ${
              msg.sender === "user"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white self-end ml-auto"
                : "bg-white border border-gray-200 text-gray-900 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-white border border-gray-200 text-gray-900 self-start mr-auto rounded-xl px-4 py-3 shadow-md">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce delay-150">●</span>
            <span className="animate-bounce delay-300">●</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask something about Home Academy..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateAnswer()}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={generateAnswer}
          disabled={loading}
          className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md transition ${
            loading ? "bg-gray-400" : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
          }`}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
