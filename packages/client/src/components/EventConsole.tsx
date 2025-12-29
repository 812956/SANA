import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Radio } from 'lucide-react';

interface Event {
    id: string; // Changed from number to string (backend sends UUID)
    timestamp: string;
    type: 'NICE' | 'NAUGHTY';
    name: string;
    location: string;
    description: string;
}

export const EventConsole = ({ events, onEventClick }: { events: Event[], onEventClick: (e: Event) => void }) => {
    return (
        <div className="absolute bottom-4 left-4 w-96 glass-panel rounded-xl overflow-hidden flex flex-col z-[1000] font-mono text-xs">
            {/* Header */}
            <div className="bg-white/5 p-3 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2 text-santa-gold">
                    <Radio className="animate-pulse" size={14} />
                    <span className="font-bold tracking-widest font-orbitron">LIVE EVENT FEED</span>
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
                                p-3 rounded border-l-2 mb-2 cursor-pointer hover:border-l-4 transition-all
                                group relative overflow-hidden
                                ${event.type === 'NICE' 
                                    ? 'bg-green-900/10 border-green-500 text-green-100' 
                                    : 'bg-red-900/10 border-red-500 text-red-100'
                                }
                            `}
                        >
                            {/* Hover Highlight */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start mb-1">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm tracking-wide flex items-center gap-2">
                                        {event.name}
                                        <span className={`w-2 h-2 rounded-full animate-pulse ${event.type === 'NICE' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    </span>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                         📍 {event.location}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                    event.type === 'NICE' 
                                    ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                                    : 'bg-red-500/20 border-red-500/30 text-red-400'
                                }`}>
                                    {event.type}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-[11px] opacity-80 mt-2 bg-black/20 p-1.5 rounded">
                                {event.type === 'NICE' ? <CheckCircle size={12} className="text-green-500" /> : <AlertCircle size={12} className="text-red-500" />}
                                <span>{event.description}</span>
                            </div>

                            <div className="absolute bottom-1 right-1 text-[8px] text-gray-600 font-mono">
                                T-{Math.floor((Date.now() - new Date(event.timestamp).getTime()) / 1000)}s
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
