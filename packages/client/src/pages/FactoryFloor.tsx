import { useEffect, useState } from 'react';
import { Package, AlertTriangle, Users, Settings, Hammer, Clock, UserCheck } from 'lucide-react';
import { useSantaSystem } from '../hooks/useSantaSystem';
import { FestiveLoader } from '../components/FestiveLoader';
import type { Workbench } from '../types';

interface Elf {
    id: string;
    name: string;
    title: string;
    avatarUrl: string;
    status: string;
}

export const FactoryFloor = () => {
    const { stats } = useSantaSystem();
    const [toyDemand, setToyDemand] = useState(0);
    const [onlineElves, setOnlineElves] = useState<Elf[]>([]);
    const [allElves, setAllElves] = useState<Record<string, Elf>>({});
    const [loading, setLoading] = useState(true);

    // Fetch Behavior Service Data (Toy Demand & Elf Details)
    useEffect(() => {
        const fetchBehaviorData = async () => {
            try {
                // 1. Toy Demand
                const demandRes = await fetch('http://localhost:3001/api/reports/stats');
                const demandData = await demandRes.json();
                setToyDemand(demandData.toysNeeded || 0);

                // 2. All Elves (to map IDs to details)
                const elvesRes = await fetch('http://localhost:3001/api/elves?limit=100');
                const elvesData = await elvesRes.json();
                const elvesMap: Record<string, Elf> = {};
                elvesData.data.forEach((e: Elf) => elvesMap[e.id] = e);
                setAllElves(elvesMap);
            } catch (e) {
                console.error("Failed to fetch behavior data", e);
            } finally {
                setLoading(false);
            }
        };

        fetchBehaviorData();
        // Poll for updates
        const interval = setInterval(fetchBehaviorData, 5000);
        return () => clearInterval(interval);
    }, []);

    // Resolve Online Elves
    useEffect(() => {
        if (stats?.onlineElfIds && Object.keys(allElves).length > 0) {
            const online = stats.onlineElfIds.map((id: string) => allElves[id]).filter(Boolean);
            setOnlineElves(online);
        }
    }, [stats, allElves]);

    const getStatusColor = (status: Workbench['status']) => {
        switch (status) {
            case 'DESIGNING': return 'bg-blue-500';
            case 'ASSEMBLING': return 'bg-yellow-500';
            case 'PAINTING': return 'bg-purple-500';
            case 'QA': return 'bg-orange-500';
            case 'WRAPPING': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading && !toyDemand) {
        return <FestiveLoader message="Loading Factory Logistics..." />;
    }

    return (
        <div className="p-8 h-full overflow-y-auto custom-scrollbar space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-santa text-santa-gold tracking-wider drop-shadow-sm uppercase">Factory Floor</h1>
                    <p className="text-white/60 font-orbitron tracking-widest text-sm">Real-time Production Logistics</p>
                </div>
                <div className="flex items-center gap-4">
                     <div className="glass-panel px-4 py-2 flex items-center gap-2 text-santa-green">
                        <div className="w-2 h-2 rounded-full bg-santa-green animate-pulse" />
                        <span className="font-bold text-sm tracking-widest">SYSTEM ONLINE</span>
                     </div>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TOY DEMAND */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertTriangle size={80} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-santa-silver font-orbitron text-xs tracking-[0.2em] uppercase mb-2">Global Demand</p>
                        <h2 className="text-5xl font-santa text-white drop-shadow-md">{toyDemand.toLocaleString()}</h2>
                        <div className="mt-4 flex items-center gap-2 text-sm text-santa-gold">
                            <span className="bg-santa-gold/20 px-2 py-0.5 rounded text-[10px] font-bold">REQUIRED</span>
                            <span className="opacity-80">Based on Nice List Reports</span>
                        </div>
                    </div>
                </div>

                {/* TOYS PRODUCED */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group border-santa-green/30">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-santa-green">
                        <Package size={80} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-santa-silver font-orbitron text-xs tracking-[0.2em] uppercase mb-2">Output</p>
                        <h2 className="text-5xl font-santa text-santa-green drop-shadow-md">{stats?.toysProduced?.toLocaleString() || '---'}</h2>
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
                             <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden flex-1 max-w-[100px]">
                                <div 
                                    className="h-full bg-santa-green" 
                                    style={{ width: `${Math.min(100, ((stats?.toysProduced || 0) / (toyDemand || 1)) * 100)}%` }}
                                />
                             </div>
                            <span className="opacity-80">
                                {toyDemand > 0 ? Math.round(((stats?.toysProduced || 0) / toyDemand) * 100) : 100}% Fulfilled
                            </span>
                        </div>
                    </div>
                </div>

                {/* ACTIVE ELVES */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-santa-red">
                        <Users size={80} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-santa-silver font-orbitron text-xs tracking-[0.2em] uppercase mb-2">Workforce</p>
                        <h2 className="text-5xl font-santa text-santa-red drop-shadow-md">{stats?.activeElves.toLocaleString() || '---'}</h2>
                        <div className="mt-4 flex items-center gap-2 text-sm text-santa-red/80">
                            <Clock size={14} />
                            <span>Current Shift Active</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[400px]">
                
                {/* PRODUCTION LINES (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-santa text-white flex items-center gap-3">
                        <Settings className="text-santa-silver animate-spin-slow" /> 
                        ASSEMBLY LINES
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats?.workbenches ? stats.workbenches.map((wb) => (
                             <div key={wb.id} className="glass-panel p-5 rounded-xl flex flex-col relative overflow-hidden group border border-white/5 hover:border-white/20 transition-colors">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs text-white/50 font-bold tracking-widest font-orbitron">{wb.name.toUpperCase()}</span>
                                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold text-black shadow-sm ${getStatusColor(wb.status).replace('bg-','bg-opacity-90 bg-')}`}>
                                        {wb.status}
                                    </span>
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-center min-h-[80px] z-10">
                                    {wb.currentToy ? (
                                        <>
                                            <div className="text-2xl font-santa text-santa-gold mb-2 truncate">{wb.currentToy}</div>
                                            <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden border border-white/10 shadow-inner">
                                                <div 
                                                    className={`h-full transition-all duration-300 ${getStatusColor(wb.status)} brightness-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]`} 
                                                    style={{ width: `${wb.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between mt-1 text-[10px] text-white/40 font-mono">
                                                <span>0%</span>
                                                <span>{Math.round(wb.progress)}%</span>
                                                <span>100%</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-white/20 flex flex-col items-center justify-center h-full">
                                            <Hammer size={32} className="mb-2 opacity-50" />
                                            <span className="text-xs tracking-widest uppercase">Awaiting Task</span>
                                        </div>
                                    )}
                                </div>

                                 {/* Ambient Glow */}
                                 <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-5 pointer-events-none transition-colors duration-500 ${getStatusColor(wb.status)}`} />
                            </div>
                        )) : (
                            [1,2,3,4].map(i => (
                                <div key={i} className="glass-panel p-4 rounded-xl h-40 animate-pulse bg-white/5" />
                            ))
                        )}
                    </div>
                </div>

                {/* LIVE ELVES (1/3 width) */}
                <div className="lg:col-span-1 flex flex-col h-full rounded-2xl glass-panel overflow-hidden border border-white/10">
                    <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
                        <h2 className="text-xl font-santa text-white flex items-center gap-2">
                            <UserCheck className="text-santa-green" /> 
                            LIVE PRESENCE
                        </h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                        {onlineElves.length > 0 ? (
                            onlineElves.map(elf => (
                                <div key={elf.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-default">
                                    <div className="relative">
                                        <img src={elf.avatarUrl} alt={elf.name} className="w-10 h-10 rounded-full border border-white/20 group-hover:border-santa-gold/50 transition-colors" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-santa-green rounded-full border-2 border-[#1a1c2e]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold text-white truncate">{elf.name}</div>
                                        <div className="text-xs text-white/50 truncate">{elf.title}</div>
                                    </div>
                                    <div className="text-xs text-santa-green font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                        ONLINE
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4 p-8 text-center">
                                <Users size={48} className="opacity-20" />
                                <p>No elves currently clocked in.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Clock In Action (Demo) */}
                    <div className="p-4 border-t border-white/10 bg-black/20">
             
                        <p className="text-[10px] text-center text-white/30 uppercase tracking-widest">
                            Manager View Only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

