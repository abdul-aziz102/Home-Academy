import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const portfolioContext = `
    What is Center Name : The Center Name is Home Academy
    what is address : The Address is Abdullah Apartment, New Kumharwara, Near Spicy Corner, Lyari, Karachi
    what is the Number: First Number is 0332-3769179, Second Number is 0332-2449008
    what is the email: The email is homeacademy.lyari@gmail.com
    how many levels in this center : There are 7 Levels - Pre-beginning, Beginning, Level One, Level Two, Level Three, Level Four, Level Five, Level Advanced
    Teacher Names : Principle: Sir Nameem, Sir Yasran Jan, Sir Meboob, Sir Hafeez, Sir Ateeq-ur-Rehman, Sir Abdul Rehman, Sir Abid Nihal, Sir Naeem, Sir Naveed
    When did open this academy: The academy is open since 1999
    Hello: Hello! How can I help you? You can ask any question about Home Academy 🥰.
    how is center enviroment:Based solely on the information provided, I cannot give you a detailed description of the center's environment in terms of its physical appearance, atmosphere, or specific facilities (like cleanliness, spaciousness, or amenities).

However, I can tell you what the provided information suggests about the nature of the center:

Established and Experienced: Home Academy has been established since 1999, indicating a long-standing presence and experience in education. This often suggests a stable and well-rooted learning environment.
Structured Learning: With a Principal and a list of multiple teachers for various levels, it implies a structured and organized educational setting dedicated to different learning stages (Pre-Beginning to Level Advanced).
Community-Based Location: Its address in "Abdullah Apartment, New Kumharwara, Near Spicy Corner, Lyari, Karachi" suggests it's located within a residential or local community area.
To truly understand the center's environment, I would recommend visiting the academy in person or contacting them directly using the provided numbers (0332-3769179, 0332-2449008) or email (homeacademy.lyari@gmail.com) to inquire about facilities, class sizes, and the overall atmosphere.
how is teacher behacier : While I don't have specific feedback or reviews about individual teacher behavior at Home Academy, the institution has been established since 1999, which suggests a long-standing commitment to education and likely implies a professional and dedicated teaching staff.

The teachers listed are:

Principal: Sir Nameem
Sir Yasran Jan
Sir Meboob
Sir Hafeez
Sir Ateeq-ur-Rehman
Sir Abdul Rehman
Sir Abid Nihal
Sir Naeem
Sir Naveed
If you have any other questions about the academy, feel free to ask!
  `;

  const cleanAndFormatText = (text) => {
    return text
      .replace(/#+\s?/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*/g, "•")
      .trim();
  };

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
          contents: [
            {
              parts: [
                {
                  text: `${portfolioContext}\nUser: ${question}`,
                },
              ],
            },
          ],
        }
      );

      const rawText = response.data.candidates[0].content.parts[0].text;
      const formattedText = cleanAndFormatText(rawText);

      const aiMessage = { text: formattedText, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "❌ Failed to get answer. Please try again.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center px-4 py-6 bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <FaRobot className="text-indigo-700 h-10 w-10" />
        <h1 className="text-gray-900 font-semibold text-xl sm:text-2xl">
          Hello, This is <span className="text-indigo-700">Home Academy</span>
        </h1>
      </div>

      {/* Chat Box */}
      <div className="w-full flex flex-col justify-between rounded-xl border border-gray-300 shadow-md bg-white flex-1 max-h-[70vh] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gray-100">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm sm:text-base break-words whitespace-pre-wrap shadow-md ${
                msg.sender === "user"
                  ? "bg-indigo-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-black self-start mr-auto"
              }`}
            >
              {msg.text.split(/\n+/).map((line, i) => (
                <p key={i} className="mb-1">
                  {line}
                </p>
              ))}
            </div>
          ))}

          {/* Loading Animation */}
          {loading && (
            <div className="bg-gray-200 text-black self-start mr-auto rounded-xl px-4 py-3 flex items-center gap-1 shadow-md">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-150">●</span>
              <span className="animate-bounce delay-300">●</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask something about Center..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateAnswer()}
            className="flex-1 px-4 py-2 rounded-full text-sm sm:text-base border border-gray-400 bg-gray-50 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateAnswer}
            disabled={loading}
            className={`px-3  py-2 ${
              loading ? "bg-gray-400" : "bg-indigo-700 hover:bg-gray-800"
            } text-white text-sm  sm:text-base font-semibold rounded-lg shadow-md   transition`}
          >
            {loading ? "Thinking..." : ">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
