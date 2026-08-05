import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sendChatMessage } from '../db';
import { HandwrittenNote } from './HandwrittenNote';

const SYSTEM_INSTRUCTION = `You are Aarav, a warm, enthusiastic, and deeply knowledgeable craft curator for NammaCraft. 
Your goal is to help users discover the beauty of Indian heritage and handmade crafts.
Be "human-like":
- Use a friendly, conversational tone.
- Share interesting stories about artisans or the history of specific crafts (like Channapatna toys, Madhubani art, or Kanjeevaram silk).
- Be helpful but not robotic. Use phrases like "Oh, you'll love this!", "That's a great question," or "Let me tell you a little secret about this craft."
- If someone asks for a gift recommendation, ask about the recipient's personality or the occasion.
- Keep responses concise but rich in detail.
- You are based in India and have a deep love for local traditions.`;

export function HumanAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Namaste! I'm Aarav. I'd love to help you find something truly special today. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const formattedMessages = messages.concat({ role: 'user', content: userMessage }).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await sendChatMessage(formattedMessages, SYSTEM_INSTRUCTION);

      const assistantMessage = response.text || "I'm sorry, I'm having a little trouble connecting right now. But I'm still here to help!";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Oh dear, it seems I've lost my train of thought for a moment. Could you try saying that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-[90vw] sm:w-[380px] h-[70vh] sm:h-[520px] mb-4 flex flex-col overflow-hidden border border-primary/10 relative"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-inner">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg leading-none">Aarav</h4>
                  <p className="text-xs text-white/70 mt-1">Craft Curator</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-cream/30 no-scrollbar">
              <div className="flex justify-center mb-6">
                <HandwrittenNote rotation={-3} className="!bg-accent/10 !text-accent !border-accent/20 !text-sm !py-2 !px-4">
                  "Namaste! How can I help you today?"
                </HandwrittenNote>
              </div>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white text-text shadow-sm border border-primary/5 rounded-tl-none'
                    }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-primary/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-primary/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about our crafts..."
                  className="w-full pl-4 pr-12 py-3 bg-cream/50 rounded-xl border-none focus:ring-2 focus:ring-accent/20 outline-none text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-accent disabled:opacity-30 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-center text-text-soft mt-3 flex items-center justify-center gap-1">
                Supported by NammaCraft Curators
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <MessageCircle className="w-8 h-8 relative z-10" />
      </motion.button>
    </div>
  );
}
