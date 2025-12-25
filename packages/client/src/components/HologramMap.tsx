import { motion } from 'framer-motion';

export const HologramMap = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-cyber-dark/80 rounded-full border-4 border-cyber-blue/20 shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden">
            
            {/* Radar Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_19%,#00F3FF33_20%,transparent_21%,transparent_39%,#00F3FF33_40%,transparent_41%,transparent_59%,#00F3FF33_60%,transparent_61%,transparent_79%,#00F3FF33_80%,transparent_81%)] opacity-50" />
            
            {/* Crosshair */}
            <div className="absolute w-full h-[1px] bg-cyber-blue/30" />
            <div className="absolute h-full w-[1px] bg-cyber-blue/30" />

            {/* Sweep Animation */}
            <div className="absolute w-1/2 h-1/2 top-0 left-0 bg-gradient-to-r from-transparent to-cyber-blue/20 origin-bottom-right animate-[spin_4s_linear_infinite]" />

            {/* Simulated Blips */}
            <motion.div 
                className="absolute w-3 h-3 bg-cyber-green rounded-full top-1/3 left-1/3 shadow-[0_0_10px_#00FA9A]"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
             <motion.div 
                className="absolute w-3 h-3 bg-cyber-red rounded-full bottom-1/4 right-1/4 shadow-[0_0_10px_#FF1F1F]"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
            
            {/* Center Info */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-cyber-blue px-4 py-1 rounded text-xs border border-cyber-blue/50">
                GSC: GLOBAL SCAN
            </div>
        </div>
    );
};
