"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, AlertCircle, Loader2, Square } from 'lucide-react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, stop } = useChat({
    api: '/api/chat',
    onError: (err) => {
      console.error('Chat error:', err);
    }
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, error]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Parse error message safely if the API returned JSON
  let displayError = "An unexpected error occurred.";
  if (error) {
    try {
      const parsed = JSON.parse(error.message);
      displayError = parsed.error || displayError;
    } catch {
      // Fallback if not JSON
      if (error.message.includes('429')) displayError = "Too many requests. Slow down!";
      else if (error.message.includes('400')) displayError = "Invalid request or message too long.";
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-card/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col mb-4 overflow-hidden transition-all duration-300 ease-out">
          
          {/* Header */}
          <div className="bg-secondary/50 p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-foreground/60 hover:text-foreground transition-colors p-1"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-foreground/50 space-y-3">
                <MessageCircle className="w-10 h-10 opacity-20" />
                <p className="text-sm">Hi! I&apos;m an AI assistant trained to answer questions about this portfolio. How can I help?</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      m.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-sm' 
                        : 'bg-secondary text-secondary-foreground rounded-bl-sm border border-border/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  </div>
                </div>
              ))
            )}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-bl-sm px-4 py-2 border border-border/50 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-xs opacity-70">Thinking...</span>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="flex justify-center my-2">
                <div className="bg-red-950/50 border border-red-500/50 text-red-200 text-xs px-3 py-2 rounded-lg flex items-center gap-2 max-w-[90%] text-center">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{displayError}</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-secondary/50 border-t border-border">
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="flex-1 bg-background border border-border rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-shadow"
                disabled={isLoading}
                maxLength={500}
                aria-label="Chat input"
              />
              
              {isLoading ? (
                <button
                  type="button"
                  onClick={stop}
                  className="absolute right-2 p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full transition-colors"
                  aria-label="Stop generating"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 p-1.5 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-[10px] text-foreground/40 text-center mt-2">
              Max 500 characters per message.
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-xl transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${isOpen ? 'rotate-90 scale-0 opacity-0 pointer-events-none' : 'rotate-0 scale-100 opacity-100'}`}
        style={{ transitionDuration: '300ms' }}
        aria-label="Open AI Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
