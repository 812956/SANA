import { useEffect, useState } from 'react';
import { User, MapPin, Search } from 'lucide-react';
import { ChildProfileModal } from '../components/ChildProfileModal';

interface Child {
    id: string;
    name: string;
    age: number;
    status: 'NICE' | 'NAUGHTY';
    city: string;
    country: string;
    lastSeen: string;
    behaviorScore: number;
    wishlist: string;
}

export const ChildDatabase = () => {
    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/children');
            const data = await res.json();
            setChildren(data.data || []);
        } catch (e) {
            console.error("Failed to fetch children", e);
        } finally {
            setLoading(false);
        }
    };

    const handleChildClick = async (childId: string) => {
        try {
            const res = await fetch(`http://localhost:3001/api/children/${childId}`);
            const data = await res.json();
            setSelectedChild(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdateStatus = async (childId: string, status: 'NICE' | 'NAUGHTY') => {
        try {
            await fetch(`http://localhost:3001/api/children/${childId}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            // Refresh local data
            fetchChildren();
            if (selectedChild && selectedChild.id === childId) {
                setSelectedChild((prev: any) => prev ? { ...prev, status } : null);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const filteredChildren = children.filter((c: any) => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 bg-base-dark p-8 overflow-y-auto relative">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-orbitron font-bold text-white mb-2">CHILD DATABASE</h1>
                    <p className="text-cyber-blue/60 tracking-wider text-sm">GLOBAL MONITORING INDEX</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-black/40 border border-cyber-blue/30 rounded-lg p-3 flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                         <span className="text-cyber-blue font-mono text-sm">DB ONLINE</span>
                    </div>
                </div>
            </header>

            {/* Controls */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-blue/50" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search Identity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-cyber-blue/30 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-cyber-blue font-mono text-sm"
                    />
                </div>
            </div>

            <div className="bg-black/20 border border-cyber-blue/20 rounded-xl overflow-hidden backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <table className="w-full text-left">
                    <thead className="bg-cyber-blue/10 border-b border-cyber-blue/20">
                        <tr>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest">IDENTITY</th>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest">STATUS</th>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest">LOCATION</th>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest text-right">SCORE</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-blue/10">
                        {loading ? (
                            <tr><td colSpan={4} className="p-8 text-center text-cyber-blue animate-pulse">Scanning Global Database...</td></tr>
                        ) : filteredChildren.map((child: any) => (
                            <tr 
                                key={child.id} 
                                onClick={() => handleChildClick(child.id)}
                                className="hover:bg-white/5 transition-colors group cursor-pointer"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-cyber-blue/20 flex items-center justify-center text-cyber-blue group-hover:scale-110 transition-transform">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-cyber-blue transition-colors">{child.name}</div>
                                            <div className="text-xs text-gray-500">{child.age} YEARS OLD</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest border ${
                                        child.status === 'NICE' 
                                            ? 'bg-cyber-green/10 text-cyber-green border-cyber-green/30' 
                                            : 'bg-cyber-red/10 text-cyber-red border-cyber-red/30'
                                    }`}>
                                        {child.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 font-mono text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-cyber-blue/50" />
                                        {child.city}, {child.country}
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <span className={`font-mono text-lg font-bold ${child.behaviorScore > 50 ? 'text-cyber-green' : 'text-cyber-red'}`}>
                                        {child.behaviorScore}
                                    </span>
                                    <span className="text-xs text-gray-600 ml-1">/100</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            <ChildProfileModal 
                child={selectedChild} 
                onClose={() => setSelectedChild(null)}
                // We pass generic handlers initially, but now we should perhaps pass direct status updaters
                onApprove={() => selectedChild && handleUpdateStatus(selectedChild.id, 'NICE')}
                onReview={() => selectedChild && handleUpdateStatus(selectedChild.id, 'NAUGHTY')}
            />
        </div>
    );
};
