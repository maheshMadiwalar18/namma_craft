import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Sparkles, RefreshCw, Check, X, Languages, Volume2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface VoiceAssistantProps {
  onDataExtracted: (data: any) => void;
}

export const VoiceAssistant = ({ onDataExtracted }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulated voice recording for demo purposes
  const startListening = () => {
    setIsListening(true);
    setError(null);
    setExtractedData(null);
    
    // In a real app, we'd use Web Speech API or record audio
    // For this demo, we'll simulate a transcript after 3 seconds
    setTimeout(() => {
      setIsListening(false);
      const mockTranscripts = [
        "I want to sell a hand-painted blue pottery vase from Jaipur. It's a traditional craft with floral motifs. I want to start the auction at 2500 rupees and it should last for 5 days.",
        "This is a hand-woven Banarasi silk stole made by master weavers in Varanasi. It's very high quality. Let's start the bidding at 4000 rupees.",
        "I have an intricate teak wood carving from Saharanpur. It's a one-of-a-kind piece showing a forest scene. The starting price is 5000 rupees."
      ];
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      setTranscript(randomTranscript);
      processWithAI(randomTranscript);
    }, 3000);
  };

  const processWithAI = async (text: string) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Extract product details from this voice description: "${text}". 
        Return a JSON object with: name, category (one of: Pottery, Textiles, Woodwork, Jewelry, Paintings), origin, startPrice (number), duration (e.g. "3 days"), craftStory.
        If a field is missing, provide a reasonable default based on the context.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              origin: { type: Type.STRING },
              startPrice: { type: Type.NUMBER },
              duration: { type: Type.STRING },
              craftStory: { type: Type.STRING },
              language: { type: Type.STRING, description: "Detected language" }
            },
            required: ["name", "category", "origin", "startPrice", "duration", "craftStory"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setExtractedData(data);
    } catch (err) {
      console.error("AI Processing Error:", err);
      setError("Failed to process voice input. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = () => {
    onDataExtracted(extractedData);
    setExtractedData(null);
    setTranscript('');
  };

  return (
    <div className="bg-white rounded-[40px] p-10 border border-accent/20 shadow-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
      
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-accent mb-2">
            <Sparkles className="w-5 h-5" />
            <h4 className="font-display font-bold text-xl">Voice Upload Assistant</h4>
          </div>
          <p className="text-text-soft text-sm max-w-md">
            Describe your product naturally. Our AI will detect the details, region, and story for you.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="listening"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-accent/20 rounded-full"
                  />
                  <button className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl relative z-10">
                    <Mic className="w-10 h-10 animate-pulse" />
                  </button>
                </div>
                <p className="mt-6 text-accent font-bold uppercase tracking-widest text-[10px] animate-pulse">Listening to your story...</p>
              </motion.div>
            ) : isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                  <RefreshCw className="w-10 h-10 animate-spin" />
                </div>
                <p className="mt-6 text-primary font-bold uppercase tracking-widest text-[10px]">AI is crafting your listing...</p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <button 
                  onClick={startListening}
                  className="w-24 h-24 bg-cream border-4 border-accent/20 text-accent rounded-full flex items-center justify-center shadow-xl hover:bg-accent hover:text-white transition-all group"
                >
                  <Mic className="w-10 h-10 group-hover:scale-110 transition-transform" />
                </button>
                <p className="mt-6 text-text-soft font-bold uppercase tracking-widest text-[10px]">Tap to start describing</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {transcript && !isProcessing && !extractedData && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cream/50 p-6 rounded-3xl border border-highlight/20 max-w-lg w-full"
          >
            <div className="flex items-center gap-2 mb-3 text-text-soft">
              <Volume2 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Captured Transcript</span>
            </div>
            <p className="text-sm text-primary italic leading-relaxed">"{transcript}"</p>
          </motion.div>
        )}

        {extractedData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full space-y-6"
          >
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">AI Extraction Successful</span>
                </div>
                {extractedData.language && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg text-[9px] font-bold text-text-soft uppercase tracking-widest shadow-sm">
                    <Languages className="w-3 h-3" /> {extractedData.language}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest mb-1">Product Name</p>
                  <p className="text-sm font-bold text-primary truncate">{extractedData.name}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest mb-1">Category</p>
                  <p className="text-sm font-bold text-primary">{extractedData.category}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest mb-1">Origin</p>
                  <p className="text-sm font-bold text-primary">{extractedData.origin}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest mb-1">Start Price</p>
                  <p className="text-sm font-bold text-accent">₹{extractedData.startPrice}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-emerald-100">
                <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest mb-1">Extracted Story</p>
                <p className="text-xs text-primary line-clamp-2 leading-relaxed">{extractedData.craftStory}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setExtractedData(null)}
                className="flex-1 py-4 bg-white border-2 border-primary/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-text-soft hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 py-4 bg-primary text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Use These Details
              </button>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-rose-500 text-xs font-bold"
          >
            <X className="w-4 h-4" /> {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};
