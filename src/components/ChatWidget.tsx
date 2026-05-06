"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I am TenderBot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages }),
      });
      if (!response.ok) throw new Error("Failed to fetch response");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-99999 flex flex-col items-end">

      {isOpen && (
        <div className="w-80 sm:w-96 rounded-lg shadow-2xl border border-slate-200 mb-4 overflow-hidden flex flex-col h-[420px]" style={{ backgroundColor: '#FAFAF7' }}>

          {/* Header */}
          <div className="p-4 flex justify-between items-center" style={{ backgroundColor: '#003533' }}>
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" style={{ color: '#B8860B' }} />
              <div>
                <span className="font-semibold text-white text-sm">TenderBot</span>
                <p className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>CRPF AI Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] rounded-lg px-4 py-2.5 text-sm"
                  style={msg.role === 'user'
                    ? { backgroundColor: '#004B49', color: '#fff', borderBottomRightRadius: 0 }
                    : { backgroundColor: '#E0F0EF', color: '#003533', borderBottomLeftRadius: 0 }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-lg text-sm" style={{ backgroundColor: '#E0F0EF', color: '#003533' }}>
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form onSubmit={handleSend} className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask TenderBot..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent text-slate-800 placeholder:text-slate-400"
                style={{ '--tw-ring-color': '#004B49' } as React.CSSProperties}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-md text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#004B49' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: '#004B49' }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {/* Gold ring accent */}
        <span className="absolute inset-0 rounded-full border-2 opacity-40" style={{ borderColor: '#B8860B' }}></span>

        {!isOpen && (
          <span className="absolute right-full mr-4 text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: '#003533' }}>
            Need help? Ask TenderBot
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: '#003533' }}></span>
          </span>
        )}
      </button>
    </div>
  );
}
