import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Gift } from 'lucide-react';

interface Event {
  id: number;
  type: 'NICE' | 'NAUGHTY';
  description: string;
  timestamp: string;
  location: string;
}

export const EventStream = ({ events }: { events: Event[] }) => {
  const recentEvents = events.slice(0, 8); // Show only top 8

  return (
    <div className="bg-cyber-hub/50 border border-cyber-blue/30 p-4 h-full rounded-lg relative overflow-hidden backdrop-blur-sm">
      <h2 className="text-cyber-blue font-orbitron text-xl mb-4 tracking-wider border-b border-cyber-blue/20 pb-2">
        <span className="animate-pulse">●</span> LIVE FEED
      </h2>
      
      <div className="space-y-3 font-mono text-sm relative z-10">
        <AnimatePresence>
          {recentEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 p-2 rounded border border-l-4 ${
                event.type === 'NICE' 
                  ? 'border-cyber-green/50 bg-cyber-green/10 text-green-300 border-l-cyber-green' 
                  : 'border-cyber-red/50 bg-cyber-red/10 text-red-300 border-l-cyber-red'
              }`}
            >
              <div className="shrink-0">
                {event.type === 'NICE' ? <Gift size={16} /> : <AlertCircle size={16} />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs opacity-70">[{new Date(event.timestamp).toLocaleTimeString()}] {event.location.toUpperCase()}</span>
                <span>{event.description}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Decorative Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent h-[10px] w-full animate-scan" />
    </div>
  );
};
