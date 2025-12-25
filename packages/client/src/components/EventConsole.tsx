import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Radio } from 'lucide-react';

interface Event {
    id: number;
    timestamp: string;
    type: 'NICE' | 'NAUGHTY';
    name: string;
    location: string;
    description: string;
}

export const EventConsole = ({ events, onEventClick }: { events: Event[], onEventClick: (e: Event) => void }) => {
    return (
        <div className="absolute bottom-4 left-4 w-96 bg-black/80 border border-cyber-blue/30 backdrop-blur rounded overflow-hidden flex flex-col z-[1000] font-mono text-xs shadow-2xl shadow-cyber-blue/20">
            {/* Header */}
            <div className="bg-cyber-blue/10 p-2 border-b border-cyber-blue/30 flex justify-between items-center">
                <div className="flex items-center gap-2 text-cyber-blue">
                    <Radio className="animate-pulse" size={14} />
                    <span className="font-bold tracking-widest">LIVE EVENT FEED</span>
                </div>
                <div className="text-[10px] text-gray-400">Targeting Priority: GLOBAL</div>
            </div>

            {/* List */}
            <div className="h-48 overflow-y-auto p-2 space-y-2 relative no-scrollbar">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
                
                <AnimatePresence initial={false}>
                    {events.slice(0, 10).map((event) => (
                        <motion.div 
                            key={event.id}
                            onClick={() => onEventClick(event)}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className={`
                                p-2 rounded border-l-2 mb-1 cursor-pointer hover:scale-105 transition-transform
                                ${event.type === 'NICE' 
                                    ? 'bg-green-900/20 border-green-500 text-green-100 hover:bg-green-900/40' 
                                    : 'bg-red-900/20 border-red-500 text-red-100 hover:bg-red-900/40'
                                }
                            `}
                        >
                            <div className="flex justify-between items-start mb-0.5">
                                <span className={`font-bold text-[10px] uppercase px-1 rounded ${event.type === 'NICE' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                    {event.type} INTERCEPT
                                </span>
                                <span className="text-[9px] opacity-50">{new Date(event.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {event.type === 'NICE' ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                                <span>{event.description}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
