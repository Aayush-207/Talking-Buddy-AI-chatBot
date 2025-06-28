// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); // ✅ NEW STATE
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]); // ✅ watch isTyping too

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true); // ✅ SHOW typing...

    try {
      const response = await fetch('https://talking-buddy-ai-chatbot.onrender.com/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, message: input }),
      });

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false); // ✅ HIDE typing...
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-xl mb-4 font-bold">
        Hello {user?.displayName || 'Friend'} 👋
      </h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === 'user' ? 'text-right' : 'text-left'}
          >
            <span
              className={`inline-block p-3 rounded-lg max-w-[75%] break-words break-all whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-green-600 text-white'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="text-left">
            <span className="inline-block p-3 rounded-lg bg-green-600 text-white animate-pulse">
              🤖 Typing...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white outline-none focus:ring focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
