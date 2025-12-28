import { useEffect, useState } from 'react';
import { Search, MapPin, UserPlus, Globe, Loader2, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Child {
    id: string;
    name: string;
    city: string;
    country: string;
    status: 'NICE' | 'NAUGHTY' | 'NEEDS_IMPROVEMENT';
    behaviorScore: number;
}

export const ElfChildDirectory = () => {
    const [children, setChildren] = useState<Child[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    // Filter Logic
    const [filterStatus, setFilterStatus] = useState<string>('ALL');

    useEffect(() => {
        fetchChildren();
    }, [search]);

    const fetchChildren = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (search) query.append('search', search);

            const res = await fetch(`http://localhost:3001/api/elf/children?${query.toString()}`);
            const data = await res.json();
            setChildren(data.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const filteredChildren = children.filter(child => {
        if (filterStatus === 'ALL') return true;
        return child.status === filterStatus;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col relative">
             <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                 <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Global Child Directory</h1>
                    <p className="text-slate-400 text-sm">Accessing Population Database: <span className="text-green-400">{children.length} Records Found</span></p>
                 </div>
                 
                 <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 flex items-center gap-2 transition-all transform hover:scale-105"
                 >
                    <UserPlus size={18} />
                    Register New Child
                 </button>
             </header>

             {/* Search & Filter Bar */}
             <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-8 shadow-xl">
                 <div className="relative flex-1 group">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-400 transition-colors" size={20} />
                     <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by Name, City, Country or ID..."
                        className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-slate-600"
                     />
                 </div>
                 
                 <div className="flex gap-2 bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
                    {['ALL', 'NICE', 'NAUGHTY'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === status 
                                ? (status === 'NICE' ? 'bg-green-500/20 text-green-400' : status === 'NAUGHTY' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-white') 
                                : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            {status}
                        </button>
                    ))}
                 </div>
             </div>

             {/* List */}
             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <Loader2 className="animate-spin mb-4" size={32} />
                        <p>Scanning global database sectors...</p>
                    </div>
                ) : filteredChildren.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 bg-slate-800/20 rounded-3xl border border-slate-800 border-dashed">
                        <Globe className="mx-auto mb-4 opacity-20" size={64} />
                        <p>No children found matching current filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {filteredChildren.map(child => (
                            <Link to={`/elf/children/${child.id}`} key={child.id} className="block group">
                                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-900/10 transition-all relative overflow-hidden group-hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xl font-bold text-slate-300 border border-slate-600 shadow-inner">
                                            {child.name.charAt(0)}
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${child.status === 'NICE' ? 'text-green-400 border-green-500/30 bg-green-500/10' : child.status === 'NAUGHTY' ? 'text-red-400 border-red-500/30 bg-red-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10'}`}>
                                            {child.status}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-1 truncate">{child.name}</h3>
                                    
                                    <div className="flex items-center text-slate-400 text-xs mb-4">
                                        <MapPin size={12} className="mr-1 text-red-500" />
                                        <span className="truncate">{child.city}, {child.country}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-end pt-4 border-t border-slate-700/30">
                                        <div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Behavior Score</div>
                                            <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${child.behaviorScore > 50 ? 'bg-green-500' : 'bg-red-500'}`} 
                                                    style={{ width: `${child.behaviorScore}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-black text-slate-200 group-hover:text-white">{child.behaviorScore}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
             </div>

             {/* Add Child Modal */}
             {showAddModal && (
                 <AddChildModal onClose={() => setShowAddModal(false)} onSuccess={() => { fetchChildren(); setShowAddModal(false); }} />
             )}
        </div>
    );
};

// Sub-component for Adding Child
const AddChildModal = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch('http://localhost:3001/api/children', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name, 
                    city, 
                    country, 
                    lat: parseFloat(lat), 
                    lng: parseFloat(lng) 
                })
            });
            onSuccess();
        } catch (e) {
            console.error(e);
            alert("Failed to register child");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                <div className="bg-gradient-to-r from-red-900/50 to-slate-900 p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <UserPlus className="text-red-500" /> New Child Registration
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-red-500 focus:outline-none transition-colors" placeholder="Full Name" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">City</label>
                            <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-red-500 focus:outline-none transition-colors" placeholder="City" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Country</label>
                            <input type="text" value={country} onChange={e => setCountry(e.target.value)} required className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-red-500 focus:outline-none transition-colors" placeholder="Country" />
                        </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-2"><Navigation size={14} /> Geo-Coordinates</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} required className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white" placeholder="Latitude" />
                            <input type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} required className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white" placeholder="Longitude" />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Precision required for Sleigh Route Optimization.</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm font-bold">Cancel</button>
                        <button type="submit" disabled={submitting} className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-red-900/20 disabled:opacity-50 transition-all">
                            {submitting ? 'Registering...' : 'Register Child'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
