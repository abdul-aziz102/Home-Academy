import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const portfolioContext = `
    What is Center Name : The Center Name is Home Academy
    what is address : The Adress is Abdullah Apartment,New Kumharwara,Near Spicy Corner,Lyari, Karachi

    what is the Number: First Number is 0332-3769179
    Second Number is 0332-2449008

    what is the email: The email is homeacademy.lyari@gmail.com

    how many levels in this center : There are 7 Levels Pre-beginning ,Beginning , level one, Level Two, Level Three, Level Four, Level Five , Level Advanced

    Teacher Names : These are the Teacher Names . Sir Yasran Jan, Sir Meboob,Sir Hafeez,Sir Ateeq-ur-Rehman, Sir Abdul Rehman, Sir Abid Nihal,Sir Naeem,Sir Naveed

    When did open this academy: The academy is open since 1999

    Hello: Hello How can I hepl You . You can ask any question to me This Home Academy 🥰.

`;

  const cleanAndFormatText = (text) => {
    return text
      .replace(/#+\s?/g, '') // remove markdown hashes
      .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold markdown
      .replace(/\*/g, '•') // replace bullet-style asterisks
      .trim();
  };

  const generateAnswer = async () => {
    if (!question.trim()) return;

    const userMessage = { text: question, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');

    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAtl06jWeRssYK2pvnsl8D5lrpPvq8vomg',
        method: 'post',
        data: {
          contents: [
            {
              parts: [
                {
                  text: `${portfolioContext}\nUser: ${question}`,
                },
              ],
            },
          ],
        },
      });

      const rawText = response.data.candidates[0].content.parts[0].text;
      const formattedText = cleanAndFormatText(rawText);

      const aiMessage = { text: formattedText, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: '❌ Failed to get answer. Please try again.', sender: 'ai' },
      ]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-2 py-4 sm:px-4 sm:py-6 bg-white">
      {/* Header */}
     <FaRobot className="text-indigo-700 h-10 w-10" />
      <h1 className="text-gray-900 font-semibold text-xl sm:text-2xl py-2 flex items-center gap-2">
        Hello,This is <span className='text-indigo-700'>Home Academy</span> 
      </h1>
      

      {/* Chat Box */}
      <div className="w-full flex flex-col justify-between rounded-xl border border-gray-300 shadow-md bg-white flex-1 max-h-[65vh] overflow-hidden">
        {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gray-100">
  {messages.map((msg, idx) => (
    <div
      key={idx}
      className={`max-w-[85%] rounded-xl px-4 py-2 text-sm sm:text-base break-words whitespace-pre-wrap ${
        msg.sender === 'user'
          ? 'bg-blue-200 text-black self-end ml-auto'
          : 'bg-gray-200 text-black self-start mr-auto'
      }`}
    >
      {msg.text.split(/\n{2,}|\n•|\n-/).map((para, i) => (
        <p key={i} className="mb-2">
          {para.trim().startsWith('•') || para.trim().startsWith('-')
            ? '• ' + para.trim().replace(/^[-•]\s?/, '')
            : para.trim()}
        </p>
      ))}
    </div>
  ))}
</div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask something about Center..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateAnswer()}
            className="flex-1 px-4 py-2 rounded-full text-sm sm:text-base border border-gray-400 bg-gray-50 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateAnswer}
            className="px-4 py-2 bg-indigo-700 text-white text-sm sm:text-base font-semibold rounded-full shadow-md hover:bg-gray-800 transition"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
