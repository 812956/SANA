import { useEffect, useState } from 'react';
import { Activity, Globe } from 'lucide-react';

export const TelemetryPanel = () => {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="absolute bottom-4 right-4 w-[480px] h-24 glass-panel rounded-xl flex items-center justify-between px-6 z-[1000]">
            {/* Left: Global Spirit Meter */}
            <div className="flex flex-col gap-2 w-1/2 pt-1 border-r border-white/10 pr-4">
                <div className="text-[10px] text-white/60 flex justify-between items-center font-orbitron">
                    <span className="flex items-center gap-2"><Globe size={12} className="text-santa-gold" /> GLOBAL SPIRIT LEVEL</span>
                    <span className="text-santa-green font-mono font-bold">94.2%</span>
                </div>
                
                {/* Dual Progress Bar */}
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-santa-green shadow-[0_0_10px_#165B33]" style={{ width: '94.2%' }} />
                    <div className="h-full bg-santa-red shadow-[0_0_10px_#D42426]" style={{ width: '5.8%' }} />
                </div>
                <div className="flex justify-between text-[9px] font-mono opacity-80">
                    <span className="text-santa-green">NICE: 4,921,002</span>
                    <span className="text-santa-red">NAUGHTY: 284,103</span>
                </div>
            </div>

            {/* Right: Reindeer Vitals */}
            <div className="flex flex-col gap-1 w-1/2 pl-4 items-end pt-1">
                <div className="text-[10px] text-white/60 flex items-center gap-2 font-orbitron">
                    <Activity size={12} className="text-santa-gold animate-pulse" /> REINDEER VITALS
                </div>
                <div className="h-8 w-full border-b border-white/10 bg-black/20 relative overflow-hidden flex items-end gap-0.5 px-1 rounded-sm">
                     {/* Simulated Equalizer */}
                     {[...Array(20)].map((_, i) => (
                        <div 
                            key={i}
                            className={`w-1.5 ${Math.random() > 0.5 ? 'bg-santa-gold/60' : 'bg-santa-gold/40'}`}
                            style={{ 
                                height: `${30 + Math.random() * 70}%`,
                                opacity: Math.random() > 0.5 ? 1 : 0.5 
                            }}
                        />
                     ))}
                </div>
                <div className="text-[10px] text-santa-gold font-mono flex gap-4">
                    <span>MACH {((tick % 10) / 10 + 2).toFixed(2)}</span>
                    <span className="text-santa-green">ENERGY 98%</span>
                </div>
            </div>
        </div>
    );
};
