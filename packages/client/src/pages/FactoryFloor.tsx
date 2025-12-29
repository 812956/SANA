import { useEffect, useState } from 'react';
import { Package, Truck, AlertTriangle, CheckSquare, Settings, Hammer } from 'lucide-react';
import { useSantaSystem } from '../hooks/useSantaSystem';
import type { Workbench } from '../types';

export const FactoryFloor = () => {
    const { stats } = useSantaSystem();
    const [pending, setPending] = useState(0);

    // Sync pending with stats
    useEffect(() => {
        if (stats) setPending(stats.pendingOrders || 0);
    }, [stats]);

    const approveOrder = async () => {
        try {
            const res = await fetch('http://localhost:3002/api/factory/approve', { method: 'POST' });
            if (res.ok) {
                // Optimistic update, but the hook will sync up shortly
                setPending(p => Math.max(0, p - 1));
            }
        } catch (e) { console.error(e); }
    };

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

    return (
        <div className="p-8 h-full overflow-y-auto">
            <h1 className="text-4xl font-santa text-santa-gold mb-8 tracking-wider drop-shadow-sm">TOY WORKSHOP</h1>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Pending Queue - THE INTERACTIVE PART */}
                <div className={`col-span-1 p-6 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${pending > 0 ? 'bg-santa-gold/10 border-santa-gold animate-pulse-slow shadow-glow-gold' : 'glass-panel border-white/10'}`}>
                    <AlertTriangle size={48} className={pending > 0 ? 'text-santa-gold' : 'text-gray-600'} />
                    <h2 className="text-4xl font-santa font-bold mt-4 text-white">{pending}</h2>
                    <p className="text-sm text-santa-gold/80 mb-4 tracking-widest font-bold font-orbitron">LETTERS TO REVIEW</p>
                    <button 
                        onClick={approveOrder}
                        disabled={pending === 0}
                        className="bg-santa-green hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                    >
                        <CheckSquare size={18} /> SEND TO ELVES
                    </button>
                </div>

                {/* Production Stats */}
                <div className="col-span-1 glass-panel p-6 rounded-xl text-center">
                    <Package className="mx-auto text-santa-green mb-2" size={32} />
                    <h2 className="text-4xl font-santa font-bold text-santa-green">{stats?.toysProduced?.toLocaleString() || '---'}</h2>
                    <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-bold font-orbitron">Toys Wrapped</p>
                </div>

                 {/* Elf Count */}
                 <div className="col-span-1 glass-panel p-6 rounded-xl text-center">
                    <Truck className="mx-auto text-santa-red mb-2" size={32} />
                    <h2 className="text-4xl font-santa font-bold text-santa-red">{stats?.activeElves.toLocaleString() || '---'}</h2>
                    <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-bold font-orbitron">Elves On Duty</p>
                </div>
            </div>

            {/* Visualizing Production Lines */}
            <h2 className="text-2xl font-santa text-white mb-4 flex items-center gap-2">
                <Settings className="animate-spin-slow text-santa-silver" /> WORKBENCH ACTIVITY
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats?.workbenches ? stats.workbenches.map((wb) => (
                     <div key={wb.id} className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-white/60 font-bold tracking-widest font-orbitron">{wb.name.toUpperCase()}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-black ${getStatusColor(wb.status).replace('bg-','text-').replace('500','200') === 'text-gray-200' ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                                {wb.status}
                            </span>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-end min-h-[100px] z-10">
                            {wb.currentToy ? (
                                <>
                                    <div className="text-lg font-santa text-santa-gold mb-1">{wb.currentToy}</div>
                                    <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                                        <div 
                                            className={`h-full transition-all duration-300 ${getStatusColor(wb.status)}`} 
                                            style={{ width: `${wb.progress}%` }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="text-white/20 flex flex-col items-center justify-center h-full">
                                    <Hammer size={24} className="mb-2" />
                                    <span className="text-xs">Awaiting Orders</span>
                                </div>
                            )}
                        </div>

                         {/* Background Effect */}
                         <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-500 ${getStatusColor(wb.status)}`} />
                    </div>
                )) : (
                    // Loading Skeletons
                    [1,2,3,4].map(i => (
                        <div key={i} className="glass-panel p-4 rounded-xl h-40 animate-pulse bg-white/5" />
                    ))
                )}
            </div>
        </div>
    );
};
