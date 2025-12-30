import { useEffect, useState, useMemo } from 'react';
import { Package, AlertTriangle, Users, Clock, CheckCircle } from 'lucide-react';
import { useSantaSystem } from '../hooks/useSantaSystem';
import { FestiveLoader } from '../components/FestiveLoader';
import io from 'socket.io-client';

interface Elf {
    id: string;
    name: string;
    title: string;
    avatarUrl: string;
    status: string;
    department: string;
}

export const FactoryFloor = () => {
    const { stats } = useSantaSystem();
    const [toyDemand, setToyDemand] = useState(0);
    const [onlineElves, setOnlineElves] = useState<Elf[]>([]);
    const [allElves, setAllElves] = useState<Record<string, Elf>>({});
    const [loading, setLoading] = useState(true);

    // Fetch Elf Data
    const fetchElvesData = async () => {
        console.log('[FactoryFloor] Fetching elf data from behavior service...');
        try {
            const elvesRes = await fetch('http://localhost:3001/api/elves?limit=100');
            const elvesData = await elvesRes.json();
            console.log('[FactoryFloor] Received elf data:', elvesData.data?.length, 'elves');
            const elvesMap: Record<string, Elf> = {};
            elvesData.data.forEach((e: Elf) => {
                elvesMap[e.id] = e;
                if (e.status === 'ONLINE') {
                    console.log('[FactoryFloor] Online elf found:', e.name, 'Department:', e.department);
                }
            });
            setAllElves(elvesMap);
            console.log('[FactoryFloor] Updated allElves state with', Object.keys(elvesMap).length, 'elves');
        } catch (e) {
            console.error("[FactoryFloor] Failed to fetch elves data", e);
        }
    };

    // Fetch Behavior Service Data (Toy Demand & Elf Details)
    useEffect(() => {
        const fetchBehaviorData = async () => {
            try {
                // 1. Toy Demand
                const demandRes = await fetch('http://localhost:3001/api/reports/stats');
                const demandData = await demandRes.json();
                setToyDemand(demandData.toysNeeded || 0);

                // 2. All Elves (to map IDs to details and get Department info)
                await fetchElvesData();
            } catch (e) {
                console.error("Failed to fetch behavior data", e);
            } finally {
                setLoading(false);
            }
        };

        fetchBehaviorData();
        // Poll for updates (demand only, elves are real-time via socket)
        const interval = setInterval(async () => {
            try {
                const demandRes = await fetch('http://localhost:3001/api/reports/stats');
                const demandData = await demandRes.json();
                setToyDemand(demandData.toysNeeded || 0);
            } catch (e) {
                console.error("Failed to fetch demand", e);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Real-time Socket.IO updates for Elf Status
    useEffect(() => {
        console.log('[FactoryFloor] Setting up Socket.IO connection...');
        const socket = io('http://localhost:3001', {
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('[FactoryFloor] ✅ Connected to Socket.IO, socket ID:', socket.id);
        });

        socket.on('connect_error', (error) => {
            console.error('[FactoryFloor] ❌ Socket.IO connection error:', error);
        });

        socket.on('elf-status-update', (data: { id: string; status: 'ONLINE' | 'OFFLINE' }) => {
            console.log('[FactoryFloor] 🔔 Elf status update received:', data);
            console.log('[FactoryFloor] Triggering elf data refetch...');
            // Immediately refetch elf data to get the latest status
            fetchElvesData().then(() => {
                console.log('[FactoryFloor] ✅ Elf data refetch complete');
            });
        });

        socket.on('disconnect', () => {
            console.log('[FactoryFloor] ⚠️ Disconnected from Socket.IO');
        });

        return () => {
            console.log('[FactoryFloor] Cleaning up Socket.IO connection');
            socket.disconnect();
        };
    }, []);

    // Resolve Online Elves - Calculate directly from elf status for real-time updates
    useEffect(() => {
        if (Object.keys(allElves).length > 0) {
            // Filter elves by their status field directly (real-time from Socket.IO)
            const online = Object.values(allElves).filter(elf => elf.status === 'ONLINE');
            setOnlineElves(online);
            console.log(`[FactoryFloor] Online elves updated: ${online.length} elves online`);
        }
    }, [allElves]);

    // Calculate Department Stats
    const departmentStats = useMemo(() => {
        const stats: Record<string, { total: number; online: number; onlineElves: Elf[] }> = {};
        
        Object.values(allElves).forEach(elf => {
            const dept = elf.department || 'General';
            if (!stats[dept]) {
                stats[dept] = { total: 0, online: 0, onlineElves: [] };
            }
            stats[dept].total++;
            
            // Check status directly for real-time updates
            if (elf.status === 'ONLINE') {
                stats[dept].online++;
                stats[dept].onlineElves.push(elf);
            }
        });

        return Object.entries(stats).sort((a, b) => b[1].online - a[1].online);
    }, [allElves]);


    if (loading && !toyDemand && !stats) {
        return <FestiveLoader message="Loading Factory Logistics..." />;
    }

    const toysProduced = stats?.toysProduced || 0;
    const pendingOrders = Math.max(0, toyDemand - toysProduced);
    const progressPercent = toyDemand > 0 ? Math.min(100, (toysProduced / toyDemand) * 100) : 100;

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

            {/* PRODUCTION STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. TOYS NEEDED */}
                <div className="glass-panel p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between border-t-4 border-santa-gold">
                   <div>
                        <div className="flex justify-between items-start mb-2">
                             <p className="text-santa-silver font-orbitron text-xs tracking-[0.2em] uppercase">Global Demand</p>
                             <AlertTriangle className="text-santa-gold opacity-50" size={20}/>
                        </div>
                        <h2 className="text-6xl font-santa text-white">{toyDemand.toLocaleString()}</h2>
                   </div>
                   <div className="mt-4 text-xs text-santa-gold/80 font-mono">
                        TARGET PRODUCTION
                   </div>
                </div>

                {/* 2. TOYS DONE */}
                <div className="glass-panel p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between border-t-4 border-santa-green">
                   <div>
                        <div className="flex justify-between items-start mb-2">
                             <p className="text-santa-silver font-orbitron text-xs tracking-[0.2em] uppercase">Completed</p>
                             <CheckCircle className="text-santa-green opacity-50" size={20}/>
                        </div>
                        <h2 className="text-6xl font-santa text-santa-green">{toysProduced.toLocaleString()}</h2>
                   </div>
                   
                    <div className="mt-4">
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-santa-green" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <div className="text-xs text-green-400 font-mono text-right">{Math.round(progressPercent)}% Fulfilled</div>
                    </div>
                </div>

                {/* 3. WORKFORCE TOTAL */}
                <div className="glass-panel p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between border-t-4 border-santa-red">
                   <div>
                        <div className="flex justify-between items-start mb-2">
                             <p className="text-santa-silver font-orbitron text-xs tracking-[0.2em] uppercase">Active Workforce</p>
                             <Users className="text-santa-red opacity-50" size={20}/>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-6xl font-santa text-santa-red">{onlineElves.length}</h2>
                            <span className="text-2xl text-white/30 font-santa">/ {Object.keys(allElves).length}</span>
                        </div>
                   </div>
                   <div className="mt-4 text-xs text-santa-red/80 font-mono flex items-center gap-2">
                        <Clock size={12} />
                        CURRENTLY CLOCKED IN
                   </div>
                </div>
            </div>

            {/* DEPARTMENT BREAKDOWN */}
            <div>
                 <h2 className="text-2xl font-santa text-white mb-6 flex items-center gap-3">
                    <Package className="text-santa-silver" /> 
                    Department Breakdown
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departmentStats.map(([dept, stat]) => (
                        <div key={dept} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-white tracking-wide">{dept}</h3>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold ${stat.online > 0 ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40'}`}>
                                    {stat.online > 0 ? 'ACTIVE' : 'OFFLINE'}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-black/20 rounded-lg p-3">
                                    <div className="text-xs text-white/40 mb-1">Working</div>
                                    <div className="text-2xl font-santa text-santa-green">{stat.online}</div>
                                </div>
                                <div className="bg-black/20 rounded-lg p-3">
                                    <div className="text-xs text-white/40 mb-1">Resting</div>
                                    <div className="text-2xl font-santa text-white/40">{stat.total - stat.online}</div>
                                </div>
                            </div>

                            {/* Active Elves Previews */}
                            {stat.onlineElves.length > 0 && (
                                <div className="flex -space-x-2 overflow-hidden py-1">
                                    {stat.onlineElves.slice(0, 5).map(elf => (
                                        <img 
                                            key={elf.id}
                                            src={elf.avatarUrl} 
                                            alt={elf.name}
                                            title={elf.name}
                                            className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1a1c2e] bg-gray-800"
                                        />
                                    ))}
                                    {stat.onlineElves.length > 5 && (
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-[#1a1c2e] bg-gray-700 text-[10px] text-white font-bold">
                                            +{stat.onlineElves.length - 5}
                                        </div>
                                    )}
                                </div>
                            )}
                             {stat.onlineElves.length === 0 && (
                                <div className="text-xs text-white/20 italic py-2">
                                    No elves from this department are clocked in.
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {departmentStats.length === 0 && (
                        <div className="col-span-full text-center p-12 text-white/30">
                            Loading Departments...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

