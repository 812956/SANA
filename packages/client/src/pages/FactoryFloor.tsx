import { useEffect, useState } from 'react';
import { Package, Truck, AlertTriangle, CheckSquare } from 'lucide-react';
import { useSantaSystem } from '../hooks/useSantaSystem';

export const FactoryFloor = () => {
    const { stats } = useSantaSystem();
    const [pending, setPending] = useState(0);

    // Sync pending with stats (but keep local state for instant UI reaction)
    useEffect(() => {
        if (stats) setPending(stats.pendingOrders || 0);
    }, [stats]);

    const approveOrder = async () => {
        try {
            const res = await fetch('http://localhost:3002/api/factory/approve', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                setPending(data.remaining);
            }
        } catch (e) { console.error(e); }
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <h1 className="text-3xl font-orbitron text-cyber-blue mb-8">FACTORY OPERATIONS</h1>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Pending Queue - THE INTERACTIVE PART */}
                <div className={`col-span-1 p-6 rounded-lg border-2 flex flex-col items-center justify-center text-center transition-all ${pending > 0 ? 'bg-orange-500/20 border-orange-500 animate-pulse-slow' : 'bg-gray-900 border-gray-700'}`}>
                    <AlertTriangle size={48} className={pending > 0 ? 'text-orange-500' : 'text-gray-600'} />
                    <h2 className="text-2xl font-bold mt-4">{pending}</h2>
                    <p className="text-sm opacity-70 mb-4">PENDING APPROVALS</p>
                    <button 
                        onClick={approveOrder}
                        disabled={pending === 0}
                        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-bold flex items-center gap-2"
                    >
                        <CheckSquare size={18} /> APPROVE BATCH
                    </button>
                </div>

                {/* Production Stats */}
                <div className="col-span-1 bg-cyber-hub/50 border border-cyber-green/30 p-6 rounded-lg backdrop-blur text-center">
                    <Package className="mx-auto text-green-400 mb-2" size={32} />
                    <h2 className="text-4xl font-mono font-bold text-green-400">{(stats as any)?.toysProduced?.toLocaleString() || '---'}</h2>
                    <p className="text-xs text-green-500/70 mt-1">TOTAL OUTPUT</p>
                </div>

                 {/* Elf Count */}
                 <div className="col-span-1 bg-cyber-hub/50 border border-cyber-blue/30 p-6 rounded-lg backdrop-blur text-center">
                    <Truck className="mx-auto text-blue-400 mb-2" size={32} />
                    <h2 className="text-4xl font-mono font-bold text-blue-400">{stats?.activeElves.toLocaleString() || '---'}</h2>
                    <p className="text-xs text-blue-500/70 mt-1">ACTIVE ELVES</p>
                </div>
            </div>

            {/* Visualizing Production Lines */}
            <h2 className="text-xl font-orbitron text-white mb-4">ASSEMBLY LINES</h2>
            <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="bg-black/40 border border-gray-700 p-4 rounded h-40 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute top-2 left-2 text-xs text-gray-400">LINE 0{i}</div>
                        <div 
                            className="bg-green-500/50 w-full transition-all duration-1000 ease-in-out" 
                            style={{ height: `${Math.random() * 80 + 20}%` }} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
