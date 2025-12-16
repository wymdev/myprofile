"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig, getGmailComposeUrl, getResumeDownloadUrl } from "@/config/portfolio.config";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  isTyping?: boolean;
}

export default function AIChat({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 0, 
      role: "ai", 
      content: `Hello! Welcome! I'm Wai Yan's AI assistant.\n\nI can help you with:\n• Work Experience (7+ years)\n• Technical Skills\n• Education\n• Resume Download\n• Contact Info\n\nWhat would you like to know?` 
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const typeMessage = async (content: string) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, role: "ai", content: "", isTyping: true }]);
    
    // Faster typing for longer messages
    const delay = content.length > 200 ? 5 : 10;
    
    for (let i = 0; i <= content.length; i++) {
      await new Promise((r) => setTimeout(r, delay));
      setMessages((prev) =>
        prev.map((msg) => msg.id === id ? { ...msg, content: content.slice(0, i) } : msg)
      );
    }
    
    setMessages((prev) => prev.map((msg) => msg.id === id ? { ...msg, isTyping: false } : msg));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      await typeMessage(data.response);
    } catch (error) {
      console.error("Chat error:", error);
      await typeMessage("Sorry, I encountered an error. Please try again or contact via email.");
    }

    setIsTyping(false);
  };

  // Quick action buttons
  const quickActions = [
    { label: "Skills", query: "What are your skills?" },
    { label: "Experience", query: "Tell me about your experience" },
    { label: "Projects", query: "Show me your projects" },
    { label: "Contact", query: "How can I contact you?" },
  ];

  // Render markdown-like content
  const renderContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="underline text-[var(--accent)] hover:opacity-80">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-50 overflow-hidden shadow-2xl flex flex-col
              bottom-0 left-0 right-0 rounded-t-2xl h-[70vh]
              md:bottom-24 md:right-6 md:left-auto md:w-[400px] md:rounded-2xl md:h-auto md:max-h-[80vh]"
            style={{ 
              background: "var(--sidebar-bg)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 py-3"
              style={{ 
                background: "linear-gradient(135deg, var(--accent), var(--syntax-type))",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-[14px]">AI Assistant</p>
                  <p className="text-white/70 text-[11px]">Powered by OpenAI + Resume</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
              style={{ background: "var(--editor-bg)" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === "user" ? "rounded-br-md" : "rounded-bl-md"
                    }`}
                    style={{
                      background: msg.role === "user" 
                        ? "linear-gradient(135deg, var(--accent), var(--syntax-type))" 
                        : "var(--list-active)",
                      color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                    }}
                  >
                    <div 
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                    />
                    {msg.isTyping && (
                      <span className="inline-block w-1 h-4 ml-0.5 bg-current animate-pulse" />
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div 
                    className="px-4 py-3 rounded-2xl rounded-bl-md flex gap-1"
                    style={{ background: "var(--list-active)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length < 3 && (
              <div 
                className="px-4 py-2 flex gap-2 flex-wrap"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => {
                      setInput(action.query);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 rounded-full text-[11px] transition-all hover:scale-105"
                    style={{
                      background: "var(--list-active)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form 
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-3"
              style={{ 
                borderTop: "1px solid var(--border-subtle)",
                background: "var(--sidebar-bg)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, experience..."
                disabled={isTyping}
                className="flex-1 px-4 py-3 rounded-xl text-[14px] outline-none transition-colors"
                style={{
                  background: "var(--editor-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-95"
                style={{
                  background: isTyping || !input.trim() 
                    ? "var(--list-active)" 
                    : "linear-gradient(135deg, var(--accent), var(--syntax-type))",
                  color: "#fff",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Floating AI Button Component
export function AIButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-2xl flex items-center justify-center z-40 overflow-hidden group"
      style={{
        background: "linear-gradient(135deg, var(--accent), var(--syntax-type))",
        boxShadow: "0 4px 24px rgba(0, 120, 212, 0.4)",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
        }}
      />
      
      {isOpen ? (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white relative z-10" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white relative z-10" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/>
        </svg>
      )}
      
      {/* Pulse effect when not open */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "inherit" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.button>
  );
}
