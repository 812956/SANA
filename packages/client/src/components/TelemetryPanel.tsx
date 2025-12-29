// React imports removed as they are no longer used
import { Activity, Globe } from 'lucide-react';
import { useSantaSystem } from '../hooks/useSantaSystem';

export const TelemetryPanel = () => {
    const { stats } = useSantaSystem();

    const niceCount = stats?.niceCount || 0;
    const naughtyCount = stats?.naughtyCount || 0;
    const total = niceCount + naughtyCount;
    const spiritLevel = total > 0 ? (niceCount / total) * 100 : 0;

    const activeElves = stats?.activeElves || 0;
    const toysProduced = stats?.toysProduced || 0;

    return (
        <div className="absolute bottom-4 right-4 w-[480px] h-24 glass-panel rounded-xl flex items-center justify-between px-6 z-[1000]">
            {/* Left: Global Spirit Meter */}
            <div className="flex flex-col gap-2 w-1/2 pt-1 border-r border-white/10 pr-4">
                <div className="text-[10px] text-white/60 flex justify-between items-center font-orbitron">
                    <span className="flex items-center gap-2"><Globe size={12} className="text-santa-gold" /> GLOBAL SPIRIT LEVEL</span>
                    <span className={`font-mono font-bold ${spiritLevel > 50 ? 'text-santa-green' : 'text-santa-red'}`}>{spiritLevel.toFixed(1)}%</span>
                </div>
                
                {/* Dual Progress Bar */}
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-santa-green shadow-[0_0_10px_#165B33] transition-all duration-1000" style={{ width: `${spiritLevel}%` }} />
                    <div className="h-full bg-santa-red shadow-[0_0_10px_#D42426] transition-all duration-1000" style={{ width: `${100 - spiritLevel}%` }} />
                </div>
                <div className="flex justify-between text-[9px] font-mono opacity-80">
                    <span className="text-santa-green">NICE: {niceCount.toLocaleString()}</span>
                    <span className="text-santa-red">NAUGHTY: {naughtyCount.toLocaleString()}</span>
                </div>
            </div>

            {/* Right: Factory Operations */}
            <div className="flex flex-col gap-1 w-1/2 pl-4 justify-center">
                <div className="text-[10px] text-white/60 flex items-center gap-2 font-orbitron mb-1">
                    <Activity size={12} className="text-santa-gold" /> FACTORY OPERATIONS
                </div>
                <div className="grid grid-cols-2 gap-2 text-white">
                    <div>
                        <div className="text-[9px] text-white/40 uppercase tracking-widest">Active Elves</div>
                        <div className="font-mono font-bold text-lg text-blue-400">{activeElves.toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="text-[9px] text-white/40 uppercase tracking-widest">Toys Built</div>
                        <div className="font-mono font-bold text-lg text-yellow-400">{toysProduced.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
