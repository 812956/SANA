import { useEffect, useState } from 'react';
import { Activity, Globe } from 'lucide-react';

export const TelemetryPanel = () => {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="absolute bottom-4 right-4 w-[480px] h-24 bg-black/90 border border-cyber-blue/30 backdrop-blur-xl rounded-lg flex items-center justify-between px-6 z-[1000] shadow-2xl">
            {/* Left: Global Spirit Meter */}
            <div className="flex flex-col gap-2 w-1/2 pt-1 border-r border-white/10 pr-4">
                <div className="text-[10px] text-gray-400 flex justify-between items-center">
                    <span className="flex items-center gap-2"><Globe size={12} /> GLOBAL SPIRIT LEVEL</span>
                    <span className="text-green-400 font-mono font-bold">94.2%</span>
                </div>
                
                {/* Dual Progress Bar */}
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]" style={{ width: '94.2%' }} />
                    <div className="h-full bg-red-500 shadow-[0_0_10px_#ef4444]" style={{ width: '5.8%' }} />
                </div>
                <div className="flex justify-between text-[9px] font-mono opacity-60">
                    <span className="text-green-300">NICE: 4,921,002</span>
                    <span className="text-red-300">NAUGHTY: 284,103</span>
                </div>
            </div>

            {/* Right: Reindeer Vitals */}
            <div className="flex flex-col gap-1 w-1/2 pl-4 items-end pt-1">
                <div className="text-[10px] text-gray-400 flex items-center gap-2">
                    <Activity size={12} className="text-cyber-blue animate-pulse" /> REINDEER VITALS
                </div>
                <div className="h-8 w-full border-b border-cyber-blue/20 bg-black/20 relative overflow-hidden flex items-end gap-0.5 px-1">
                     {/* Simulated Equalizer */}
                     {[...Array(20)].map((_, i) => (
                        <div 
                            key={i}
                            className="w-1.5 bg-cyber-blue/60"
                            style={{ 
                                height: `${30 + Math.random() * 70}%`,
                                opacity: Math.random() > 0.5 ? 1 : 0.5 
                            }}
                        />
                     ))}
                </div>
                <div className="text-[10px] text-cyber-blue font-mono flex gap-4">
                    <span>MACH {((tick % 10) / 10 + 2).toFixed(2)}</span>
                    <span className="text-green-400">ENERGY 98%</span>
                </div>
            </div>
        </div>
    );
};
