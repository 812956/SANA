import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AIResponse {
    type: 'NAVIGATE' | 'SPEAK' | 'ACTION';
    payload: string;
    action?: string | null;
}

import { useAlert } from '../context/AlertContext';
import { useSantaAI } from '../context/SantaAIContext';

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
    const { showAlert } = useAlert();
    const { executeTool } = useSantaAI();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
    const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
        { role: 'ai', content: "Ho ho ho! I am SANA, Santa's Advanced Neural Algorithm. How can I help you today?" }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const recognitionRef = useRef<any>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const restartTimeoutRef = useRef<number | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load speech synthesis voices
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            // Load voices
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }, []);

    const speakResponse = (text: string) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.pitch = 0.9; // Lower pitch for Santa
            utterance.rate = 1.0;
            utterance.volume = 1.0;
            
            // Try to find a good voice
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

        setQuery('');
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
                console.log('[SantaAI] Tool parameters:', params);
                
                // Use retry logic to handle race conditions (especially for voice commands)
                const success = await executeToolWithRetry(executeTool, toolName, params);
                
                if (success) {
                    console.log('[SantaAI] ✅ Tool executed successfully:', toolName);
                    setMessages(prev => [...prev, { role: 'ai', content: `Executing: ${toolName}...` }]);
                } else {
                    console.error('[SantaAI] ❌ Tool execution failed:', toolName);
                    console.error('[SantaAI] Tool not registered on this page');
                    setMessages(prev => [...prev, { role: 'ai', content: `I'm sorry, the "${toolName}" feature is not available on this page. Try navigating to the map first.` }]);
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

    // Request microphone permission
    const requestMicrophonePermission = async (): Promise<boolean> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            setMicPermission('granted');
            console.log('✅ Microphone permission granted');
            return true;
        } catch (error: any) {
            console.error('❌ Microphone permission denied:', error);
            setMicPermission('denied');
            
            const errorMsg = error.name === 'NotAllowedError' 
                ? 'Microphone access denied. Please enable microphone permissions in your browser settings.'
                : 'Unable to access microphone. Please check your device settings.';
            
            setMessages(prev => [...prev, { role: 'ai', content: `⚠️ ${errorMsg}` }]);
            speakResponse(errorMsg);
            
            showAlert({
                title: 'Microphone Access Required',
                message: errorMsg,
                type: 'error'
            });
            
            return false;
        }
    };

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check for secure context (required for some browsers)
            const isSecureContext = window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
            
            if (!isSecureContext) {
                console.warn('⚠️ Speech Recognition requires a secure context (HTTPS or localhost)');
                return;
            }

            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            
            if (!SpeechRecognition) {
                console.warn('⚠️ Speech Recognition not supported in this browser');
                console.warn('Supported browsers: Chrome, Edge, Safari');
                return;
            }

            try {
                const recognition = new SpeechRecognition();
                // Use non-continuous mode - more reliable, less prone to network errors
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = 'en-US';
                recognition.maxAlternatives = 1;

                let hasShownError = false; // Prevent duplicate errors

                recognition.onstart = () => {
                    console.log('🎤 Speech recognition started');
                    setIsListening(true);
                };

                recognition.onresult = (event: any) => {
                    let finalTranscript = '';
                    let interimTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript;
                        } else {
                            interimTranscript += transcript;
                        }
                    }

                    // Show interim results in real-time
                    if (interimTranscript) {
                        setQuery(interimTranscript);
                    }

                    // Process final transcript
                    if (finalTranscript) {
                        const cmd = finalTranscript.trim();
                        console.log('📝 Final transcript:', cmd);
                        setQuery(cmd);
                        
                        // Auto-submit the command
                        // Recognition will auto-stop in non-continuous mode after final result
                        // Increased delay to 300ms to ensure tools are registered (handles React Strict Mode double-mounting)
                        setTimeout(() => {
                            processCommand(cmd);
                        }, 300);
                    }
                };

                recognition.onerror = (event: any) => {
                    console.warn('⚠️ Speech recognition error:', event.error);
                    
                    // Handle specific errors
                    if (event.error === 'no-speech') {
                        console.log('No speech detected');
                        setIsListening(false);
                        return;
                    }
                    
                    if (event.error === 'aborted') {
                        console.log('Recognition aborted (normal stop)');
                        setIsListening(false);
                        return;
                    }

                    // Stop listening on error
                    setIsListening(false);

                    // Handle network errors - disable voice recognition if it's not working
                    if (event.error === 'network') {
                        console.error('⚠️ Network error in speech recognition.');
                        console.error('The Web Speech API is not available in your environment.');
                        
                        // Only show error once and disable the feature
                        if (!hasShownError) {
                            setMicPermission('denied'); // Use this to visually disable the mic button
                            setMessages(prev => [...prev, { 
                                role: 'ai', 
                                content: '⚠️ Voice recognition is not available in your browser environment. Please use text chat instead. This is a browser limitation, not a network issue.' 
                            }]);
                            hasShownError = true;
                            
                            // Disable the recognition object
                            recognitionRef.current = null;
                        }
                        return;
                    }

                    // Handle other errors
                    if (!hasShownError) {
                        let errorMessage = '';

                        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                            errorMessage = 'Microphone access denied. Please enable permissions in your browser settings.';
                            setMicPermission('denied');
                        } else if (event.error === 'audio-capture') {
                            errorMessage = 'No microphone detected. Please connect a microphone and try again.';
                        } else if (event.error === 'service-not-allowed') {
                            errorMessage = 'Speech recognition service not available in this browser.';
                        } else {
                            // Unknown error - log but don't spam user
                            console.error('Unknown speech recognition error:', event.error);
                            return;
                        }

                        if (errorMessage) {
                            setMessages(prev => [...prev, { role: 'ai', content: `⚠️ ${errorMessage}` }]);
                            hasShownError = true;
                        }
                    }
                };

                recognition.onend = () => {
                    console.log('🛑 Speech recognition ended');
                    setIsListening(false);
                };

                recognitionRef.current = recognition;
                console.log('✅ Speech recognition initialized (non-continuous mode)');
            } catch (error) {
                console.error('❌ Failed to initialize speech recognition:', error);
                setMicPermission('denied');
            }
        }

        return () => {
            if (recognitionRef.current) {
                try { 
                    recognitionRef.current.abort(); 
                } catch (e) {
                    console.error('Error aborting recognition:', e);
                }
            }
            if (restartTimeoutRef.current) {
                clearTimeout(restartTimeoutRef.current);
            }
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleListening = async () => {
        if (!recognitionRef.current) {
            showAlert({
                title: 'Not Supported',
                message: 'Speech recognition is not supported in this browser. Please use Chrome or Safari.',
                type: 'error'
            });
            return;
        }

        if (isListening) {
            // Stop listening
            console.log('🛑 Stopping speech recognition');
            try {
                recognitionRef.current.stop();
                if (restartTimeoutRef.current) {
                    clearTimeout(restartTimeoutRef.current);
                }
            } catch (e) {
                console.error('Error stopping recognition:', e);
            }
            setIsListening(false);
        } else {
            // Start listening
            console.log('🎤 Starting speech recognition');
            
            // Request microphone permission first
            if (micPermission !== 'granted') {
                const granted = await requestMicrophonePermission();
                if (!granted) return;
            }

            try {
                setQuery(''); // Clear previous query
                recognitionRef.current.start();
                console.log('✅ Speech recognition started successfully');
            } catch (e: any) {
                console.error('❌ Error starting recognition:', e);
                
                // Handle "already started" error
                if (e.message?.includes('already started')) {
                    try {
                        recognitionRef.current.stop();
                        setTimeout(() => {
                            try {
                                recognitionRef.current.start();
                            } catch (retryErr) {
                                console.error('Retry failed:', retryErr);
                            }
                        }, 100);
                    } catch (stopErr) {
                        console.error('Stop failed:', stopErr);
                    }
                } else {
                    setMessages(prev => [...prev, { 
                        role: 'ai', 
                        content: '⚠️ Failed to start voice recognition. Please try again.' 
                    }]);
                }
            }
        }
    };

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
                                disabled={isProcessing}
                                className={`relative p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isListening 
                                        ? 'bg-santa-red text-white shadow-lg shadow-red-500/50 scale-110' 
                                        : micPermission === 'denied'
                                        ? 'bg-red-900/50 text-red-400'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {isListening ? (
                                    <>
                                        <MicOff size={16} className="relative z-10" />
                                        {/* Animated pulse rings */}
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
                                        : micPermission === 'denied'
                                        ? "Microphone access denied - type to chat"
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
