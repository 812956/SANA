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
            <h1 className="text-4xl font-santa text-santa-gold mb-8 tracking-wider">TOY WORKSHOP</h1>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Pending Queue - THE INTERACTIVE PART */}
                <div className={`col-span-1 p-6 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${pending > 0 ? 'bg-santa-gold/10 border-santa-gold animate-pulse-slow' : 'bg-gray-900 border-gray-700'}`}>
                    <AlertTriangle size={48} className={pending > 0 ? 'text-santa-gold' : 'text-gray-600'} />
                    <h2 className="text-4xl font-santa font-bold mt-4 text-white">{pending}</h2>
                    <p className="text-sm text-santa-gold/80 mb-4 tracking-widest font-bold">LETTERS TO REVIEW</p>
                    <button 
                        onClick={approveOrder}
                        disabled={pending === 0}
                        className="bg-santa-green hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg"
                    >
                        <CheckSquare size={18} /> SEND TO ELVES
                    </button>
                </div>

                {/* Production Stats */}
                <div className="col-span-1 bg-santa-midnight border border-white/10 p-6 rounded-xl backdrop-blur text-center shadow-2xl">
                    <Package className="mx-auto text-green-500 mb-2" size={32} />
                    <h2 className="text-4xl font-santa font-bold text-green-500">{(stats as any)?.toysProduced?.toLocaleString() || '8,432'}</h2>
                    <p className="text-xs text-green-500/70 mt-1 uppercase tracking-widest font-bold">Toys Wrapped</p>
                </div>

                 {/* Elf Count */}
                 <div className="col-span-1 bg-santa-midnight border border-white/10 p-6 rounded-xl backdrop-blur text-center shadow-2xl">
                    <Truck className="mx-auto text-santa-red mb-2" size={32} />
                    <h2 className="text-4xl font-santa font-bold text-santa-red">{stats?.activeElves.toLocaleString() || '42'}</h2>
                    <p className="text-xs text-red-500/70 mt-1 uppercase tracking-widest font-bold">Elves On Duty</p>
                </div>
            </div>

            {/* Visualizing Production Lines */}
            <h2 className="text-2xl font-santa text-white mb-4">WORKBENCH ACTIVITY</h2>
            <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="bg-santa-midnight/50 border border-white/10 p-4 rounded-xl h-40 flex flex-col justify-end relative overflow-hidden group">
                        <div className="absolute top-2 left-2 text-xs text-gray-500 font-bold tracking-widest">BENCH 0{i}</div>
                        <div 
                            className="bg-santa-gold/80 w-full rounded-t-sm shadow-[0_0_15px_rgba(248,178,41,0.3)] transition-all duration-1000 ease-in-out" 
                            style={{ height: `${Math.random() * 60 + 20}%` }} 
                        />
                         {/* Little Snowflakes in the background of cards */}
                         <div className="absolute top-0 right-0 p-2 opacity-10">❄</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
