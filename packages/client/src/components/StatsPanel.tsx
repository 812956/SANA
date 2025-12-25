import { Activity, Battery, Package, Archive } from 'lucide-react';

export const StatsPanel = ({ stats, health }: { stats: any, health: any }) => {
    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Logistics Metric A */}
            <div className="bg-cyber-hub/50 border border-cyber-green/30 p-4 rounded-lg flex-1 backdrop-blur-sm shadow-[0_0_15px_rgba(16,124,16,0.1)]">
                <div className="flex items-center justify-between text-cyber-green mb-2">
                    <h3 className="font-orbitron">TOY PRODUCTION</h3>
                    <Package className="animate-pulse" />
                </div>
                <div className="text-4xl font-mono text-green-400 font-bold tracking-tighter">
                    {stats ? stats.toysProduced.toLocaleString() : '---'}
                </div>
                <div className="text-xs text-green-500/70 mt-1">UNIT: GIFTS / HR</div>
            </div>

            {/* Logistics Metric B */}
            <div className="bg-cyber-hub/50 border border-cyber-red/30 p-4 rounded-lg flex-1 backdrop-blur-sm shadow-[0_0_15px_rgba(255,31,31,0.1)]">
                <div className="flex items-center justify-between text-cyber-red mb-2">
                    <h3 className="font-orbitron">COAL RESERVES</h3>
                    <Archive />
                </div>
                <div className="text-4xl font-mono text-red-500 font-bold tracking-tighter">
                    {stats ? stats.coalStockpiled.toLocaleString() : '---'}
                </div>
                 <div className="text-xs text-red-500/70 mt-1">UNIT: KG</div>
            </div>

             {/* System Health Flex */}
             <div className="bg-black/40 border border-cyber-blue/20 p-4 rounded-lg">
                <h3 className="text-xs text-cyber-blue/80 mb-2 border-b border-cyber-blue/20 pb-1">MICROSERVICE MESH STATUS</h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-gray-400">BEHAVIOR_NODES_V1</span>
                        <span className={`px-2 py-0.5 rounded ${health.behavior === 'ONLINE' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                            {health.behavior}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-gray-400">LOGISTICS_Core_V9</span>
                        <span className={`px-2 py-0.5 rounded ${health.logistics === 'ONLINE' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                            {health.logistics}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-gray-400">SLEIGH_TELEMETRY</span>
                         <span className="text-yellow-500 flex items-center gap-1">
                            <Battery size={10} /> {stats ? Math.round(stats.sleighBattery) + '%' : '---'}
                         </span>
                    </div>
                </div>
             </div>
        </div>
    );
};
