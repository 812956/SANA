import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AIResponse {
    type: 'NAVIGATE' | 'SPEAK' | 'ACTION';
    payload: string;
    action?: string | null;
}

export const SantaAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
        { role: 'ai', content: "Ho ho ho! I am SANA, Santa's Advanced Neural Algorithm. How can I help you today?" }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const recognitionRef = useRef<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setQuery(transcript);
                    setIsListening(false);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim() || isProcessing) return;

        const userText = query;
        setQuery('');
        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setIsProcessing(true);

        try {
            const res = await fetch('http://localhost:3000/api/ai/command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: userText })
            });
            
            const data: AIResponse = await res.json();
            
            if (data.type === 'NAVIGATE') {
                setMessages(prev => [...prev, { role: 'ai', content: `Navigating to ${data.action || data.payload}...` }]);
                setTimeout(() => {
                    navigate(data.payload);
                    setIsOpen(false);
                }, 1000);
            } else {
                setMessages(prev => [...prev, { role: 'ai', content: data.payload }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'ai', content: "My neural pathways are a bit frozen right now. Try again later!" }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <motion.div 
            drag
            dragMomentum={false}
            dragConstraints={{
                top: -window.innerHeight + 200,
                left: -window.innerWidth + 200,
                right: 100,
                bottom: 100,
            }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
        >
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all animate-in slide-in-from-bottom-10 duration-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 flex items-center justify-between cursor-move">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <Bot className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">S.A.N.A.</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-[10px] text-red-100 font-medium tracking-wide">ONLINE</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700 flex items-center gap-2">
                                    <Sparkles size={14} className="text-yellow-400 animate-spin" />
                                    <span className="text-xs text-slate-400">Processing...</span>
                                </div>
                            </div>
                        )}
                        {isListening && (
                            <div className="flex justify-start">
                                <div className="bg-red-900/30 rounded-2xl rounded-bl-none px-4 py-3 border border-red-500/50 flex items-center gap-2">
                                    <Mic size={14} className="text-red-400 animate-pulse" />
                                    <span className="text-xs text-red-300">Listening...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 bg-slate-950 border-t border-white/10">
                        <div className="relative flex items-center gap-2">
                            <button
                                type="button"
                                onClick={toggleListening}
                                className={`p-2 rounded-lg transition-colors ${
                                    isListening 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                            >
                                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                            </button>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask Santa or navigate..."
                                className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3 border border-slate-800 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none transition-all"
                            />
                            <button 
                                type="submit" 
                                disabled={!query.trim() || isProcessing}
                                className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isOpen 
                        ? 'bg-slate-800 text-slate-400 rotate-90' 
                        : 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                }`}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <>
                        <Bot size={28} className="relative z-10" />
                        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></span>
                    </>
                )}
            </button>
        </motion.div>
    );
};
