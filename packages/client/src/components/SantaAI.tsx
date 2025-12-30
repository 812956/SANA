import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AIResponse {
    type: 'NAVIGATE' | 'SPEAK' | 'ACTION';
    payload: string;
    action?: string | null;
}

import { useSantaAI } from '../context/SantaAIContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

// Helper function to retry tool execution with delay
const executeToolWithRetry = async (
    executeTool: (name: string, params: any) => boolean,
    toolName: string,
    params: any,
    maxRetries: number = 3,
    delayMs: number = 500
): Promise<boolean> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`[SantaAI] Attempt ${attempt}/${maxRetries} to execute tool: ${toolName}`);
        
        const success = executeTool(toolName, params);
        if (success) {
            console.log(`[SantaAI] ✅ Tool executed successfully on attempt ${attempt}`);
            return true;
        }
        
        if (attempt < maxRetries) {
            console.log(`[SantaAI] ⏳ Tool not ready, waiting ${delayMs}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    
    console.error(`[SantaAI] ❌ Tool execution failed after ${maxRetries} attempts`);
    return false;
};

export const SantaAI = () => {
    const { executeTool } = useSantaAI();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Message history
    const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
        { role: 'ai', content: "Ho ho ho! I am SANA, Santa's Advanced Neural Algorithm. How can I help you today?" }
    ]);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load speech synthesis voices
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }, []);

    const speakResponse = (text: string) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.pitch = 0.9;
            utterance.rate = 1.0;
            utterance.volume = 1.0;
            
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => 
                v.name.includes('Google US English') || 
                v.name.includes('Samantha') ||
                v.lang === 'en-US'
            );
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
        }
    };

    const processCommand = async (text: string) => {
        if (!text.trim() || isProcessing) return;

        setQuery(''); // clear input
        // Only add user message if it wasn't already added (for voice, we add it visually via transcript, but here we enforce consistency)
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsProcessing(true);

        try {
            const res = await fetch('/api/ai/command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            
            const data: AIResponse = await res.json();
            
            // Speak the response
            const speechText = data.type === 'SPEAK' ? data.payload : 
                             data.type === 'NAVIGATE' ? `Navigating to ${data.action || 'destination'}` : 
                             `Executing ${data.payload}`;
            speakResponse(speechText);

            if (data.type === 'NAVIGATE') {
                setMessages(prev => [...prev, { role: 'ai', content: `Navigating to ${data.action || data.payload}...` }]);
                setTimeout(() => {
                    navigate(data.payload);
                }, 1000);
            } else if (data.type === 'ACTION') {
                const toolName = data.payload; 
                const params = typeof data.action === 'string' ? JSON.parse(data.action) : data.action;
                
                console.log('[SantaAI] Attempting to execute tool:', toolName);
                
                // Use retry logic to handle race conditions
                const success = await executeToolWithRetry(executeTool, toolName, params);
                
                if (success) {
                    setMessages(prev => [...prev, { role: 'ai', content: `Executing: ${toolName}...` }]);
                } else {
                    const fallbackMsg = `I'm sorry, the "${toolName}" feature is not available on this page.`;
                    setMessages(prev => [...prev, { role: 'ai', content: fallbackMsg }]);
                    speakResponse(fallbackMsg);
                }
            } else {
                setMessages(prev => [...prev, { role: 'ai', content: data.payload }]);
            }
        } catch (error) {
            console.error(error);
            const errorMsg = "My neural pathways are a bit frozen right now. Try again later!";
            setMessages(prev => [...prev, { role: 'ai', content: errorMsg }]);
            speakResponse(errorMsg);
        } finally {
            setIsProcessing(false);
        }
    };

    // Use our new hook
    const { 
        isListening, 
        isSupported, 
        permissionState, 
        toggleListening, 
        stopListening 
    } = useSpeechRecognition({
        onResult: (transcript) => {
            console.log('📝 Voice Command:', transcript);
            // Immediately stop listening and process
            stopListening();
            // We set the query just for visual feedback before processing
            setQuery(transcript);
            
            // Small delay to allow UI to update
            setTimeout(() => {
                processCommand(transcript);
            }, 300);
        },
        onError: (errorMsg) => {
            setMessages(prev => [...prev, { role: 'ai', content: `⚠️ ${errorMsg}` }]);
            speakResponse(errorMsg);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        processCommand(query);
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
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto font-sans"
        >
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 glass-panel rounded-2xl overflow-hidden flex flex-col transition-all animate-in slide-in-from-bottom-10 duration-200 shadow-2xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-santa-red to-red-900 p-4 flex items-center justify-between cursor-move">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <Bot className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm font-santa tracking-widest">S.A.N.A.</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-santa-green animate-pulse"></span>
                                    <span className="text-[10px] text-white/90 font-medium tracking-wide">ONLINE</span>
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
                                        ? 'bg-santa-red text-white rounded-br-none' 
                                        : 'bg-white/10 text-white rounded-bl-none border border-white/10'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 rounded-2xl rounded-bl-none px-4 py-3 border border-white/10 flex items-center gap-2">
                                    <Sparkles size={14} className="text-santa-gold animate-spin" />
                                    <span className="text-xs text-gray-400">Processing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 bg-black/40 border-t border-white/10">
                        <div className="relative flex items-center gap-2">
                            <button
                                type="button"
                                onClick={toggleListening}
                                disabled={isProcessing || !isSupported}
                                className={`relative p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isListening 
                                        ? 'bg-santa-red text-white shadow-lg shadow-red-500/50 scale-110' 
                                        : permissionState === 'denied'
                                        ? 'bg-red-900/50 text-red-400'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                                title={!isSupported ? "Voice not supported in this browser" : "Toggle Voice Command"}
                            >
                                {isListening ? (
                                    <>
                                        <MicOff size={16} className="relative z-10" />
                                        <span className="absolute inset-0 rounded-lg bg-santa-red animate-ping opacity-75"></span>
                                        <span className="absolute inset-0 rounded-lg bg-santa-red animate-pulse opacity-50"></span>
                                    </>
                                ) : (
                                    <Mic size={16} />
                                )}
                            </button>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={
                                    isListening 
                                        ? "Listening..." 
                                        : permissionState === 'denied'
                                        ? "Microphone access denied"
                                        : "Ask Santa or navigate..."
                                }
                                className={`flex-1 bg-white/5 text-white placeholder-gray-500 text-sm rounded-xl px-4 py-3 border transition-all outline-none ${
                                    isListening
                                        ? 'border-santa-red/50 ring-1 ring-santa-red/50 bg-red-900/10'
                                        : 'border-white/10 focus:border-santa-gold/50 focus:ring-1 focus:ring-santa-gold/50'
                                }`}
                                disabled={isProcessing}
                            />
                            <button 
                                type="submit" 
                                disabled={!query.trim() || isProcessing}
                                className="p-2 bg-santa-gold hover:bg-yellow-500 text-santa-midnight rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        {/* Status indicator */}
                        {isListening && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-red-300">
                                <div className="flex gap-1">
                                    <span className="w-1 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                                </div>
                                <span>Voice recording active - speak now</span>
                            </div>
                        )}
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isOpen 
                        ? 'bg-santa-surface border border-white/20 text-gray-400 rotate-90' 
                        : 'bg-gradient-to-br from-santa-red to-red-700 text-white shadow-[0_0_20px_rgba(212,36,38,0.5)]'
                }`}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <>
                        <div className="relative z-10">
                                {/* Santa Hat Overlay */}
                                <div className="absolute -top-3 -right-2 pointer-events-none transform rotate-12">
                                <svg width="32" height="32" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42.5 35C42.5 37 10 37 7.5 35C5 33 5 28 8 26C11 24 40 24 42 26C44 28 42.5 33 42.5 35Z" fill="white"/>
                                    <path d="M10 26C10 26 15 2 25 2C35 2 40 26 40 26" stroke="#D42426" strokeWidth="20" strokeLinecap="round"/>
                                    <circle cx="44" cy="30" r="5" fill="white"/>
                                </svg>
                                </div>
                                <Bot size={28} />
                        </div>
                        <span className="absolute inset-0 rounded-full bg-santa-red animate-ping opacity-20"></span>
                    </>
                )}
            </button>
        </motion.div>
    );
};
