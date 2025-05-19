"use client";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";

interface AIChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onSendPrompt: (prompt: string) => Promise<string>;
}

interface Message {
  role: "user" | "ai";
  content: string;
}

const AIChatBox: React.FC<AIChatBoxProps> = ({ isOpen, onClose, onSendPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const response = await onSendPrompt(prompt);
      const aiMessage: Message = { role: "ai", content: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { role: "ai", content: "Error: Could not get AI response." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 w-80 h-[500px] bg-white shadow-lg rounded-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-3 bg-gray-100 rounded-t-lg border-b">
        <h3 className="text-sm font-semibold text-gray-800">AI Assistant</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <AiOutlineClose size={18} />
        </button>
      </div>

      <div ref={chatContainerRef} className="flex-1 p-3 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <img src="/chat-puzzle.png" alt="Chat Puzzle" className="h-20 w-20 mb-4" />
              <p className="text-gray-500 text-center text-sm">Ask the AI anything!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block p-2 rounded-lg text-sm ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t flex items-center gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your prompt..."
          className="flex-1 p-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-[#3900b3] text-white rounded-md"
        >
          <AiOutlineSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default AIChatBox;