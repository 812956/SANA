import { useState, useRef, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
    onResult?: (transcript: string) => void;
    onEnd?: () => void;
    onError?: (error: string) => void;
}

export const useSpeechRecognition = ({ onResult, onEnd, onError }: UseSpeechRecognitionProps = {}) => {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            
            if (!SpeechRecognition) {
                setIsSupported(false);
                return;
            }

            try {
                const recognition = new SpeechRecognition();
                recognition.continuous = false; // We want single command mode for stability
                recognition.interimResults = true;
                recognition.lang = 'en-US';
                recognition.maxAlternatives = 1;

                recognition.onstart = () => {
                    setIsListening(true);
                    setPermissionState('granted');
                };

                recognition.onresult = (event: any) => {
                    let finalTranscript = '';
                    
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        }
                    }

                    if (finalTranscript && onResult) {
                        onResult(finalTranscript.trim());
                    }
                };

                recognition.onerror = (event: any) => {
                    console.warn('[useSpeechRecognition] Error:', event.error);
                    
                    if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                        setPermissionState('denied');
                        if (onError) onError('Microphone access denied. Please enable permissions.');
                    } else if (event.error === 'no-speech') {
                         // Ignore no-speech, it just means they didn't say anything
                         if (onError) onError('No speech detected.');
                    } else if (event.error === 'network') {
                        if (onError) onError('Network error. Voice recognition requires an internet connection.');
                    } else {
                         if (onError) onError(`Voice error: ${event.error}`);
                    }
                    setIsListening(false);
                };

                recognition.onend = () => {
                    setIsListening(false);
                    if (onEnd) onEnd();
                };

                recognitionRef.current = recognition;
            } catch (err) {
                console.error('Error initializing speech recognition:', err);
                setIsSupported(false);
            }
        }
    }, [onResult, onEnd, onError]);

    const startListening = useCallback(() => {
        if (!recognitionRef.current || !isSupported) return;

        try {
            recognitionRef.current.start();
        } catch (error: any) {
            // Handle "already started" race condition
            if (error.message && error.message.includes('already started')) {
                // Just ignore it, we are already listening
                return;
            }
            console.error('Error starting recognition:', error);
            if (onError) onError('Could not start voice recognition.');
        }
    }, [isSupported, onError]);

    const stopListening = useCallback(() => {
        if (!recognitionRef.current) return;
        try {
            recognitionRef.current.stop();
        } catch (error) {
            console.error('Error stopping recognition:', error);
        }
    }, []);

    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    return {
        isListening,
        isSupported,
        permissionState,
        startListening,
        stopListening,
        toggleListening
    };
};
