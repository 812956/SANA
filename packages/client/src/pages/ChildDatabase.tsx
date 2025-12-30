import { useEffect, useState } from 'react';
import { FestiveLoader } from '../components/FestiveLoader';
import { MapPin, Search, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSantaAI } from '../context/SantaAIContext';


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
    const navigate = useNavigate();
    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 12;
    // Filters
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'NICE' | 'NAUGHTY'>('ALL');
    const [filterCountry, setFilterCountry] = useState<string>('ALL');
    const [filterCity, setFilterCity] = useState<string>('ALL');

    const { registerTool, unregisterTool } = useSantaAI();

    useEffect(() => {
        registerTool('filter_children', (params: any) => {
            if (params.search) setSearchTerm(params.search);
            if (params.country) setFilterCountry(params.country);
            if (params.city) setFilterCity(params.city);
            if (params.status) setFilterStatus(params.status);
        });
        return () => unregisterTool('filter_children');
    }, [registerTool, unregisterTool]);

    useEffect(() => {
        setPage(1); // Reset page on search or filter change
        fetchChildren(1);
    }, [searchTerm, filterStatus, filterCountry, filterCity]);

    useEffect(() => {
        fetchChildren(page);
    }, [page]);

    const fetchChildren = async (pageNum: number) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (searchTerm) query.append('search', searchTerm);
            if (filterStatus !== 'ALL') query.append('status', filterStatus);
            if (filterCountry !== 'ALL') query.append('country', filterCountry);
            if (filterCity !== 'ALL') query.append('city', filterCity);
            query.append('page', pageNum.toString());
            query.append('limit', LIMIT.toString());

            const res = await fetch(`http://localhost:3001/api/children?${query.toString()}`);
            const data = await res.json();
            
            // Handle both new pagination (object) and old (array) formats for robustness
            if (Array.isArray(data)) {
                setChildren(data);
                setTotalPages(1);
            } else {
                setChildren(data.data || []);
                if (data.pagination) {
                    setTotalPages(data.pagination.totalPages);
                }
            }
        } catch (e) {
            console.error("Failed to fetch children", e);
        } finally {
            setLoading(false);
        }
    };

    const handleChildClick = (childId: string) => {
        navigate(`/children/${childId}`);
    };

    // Derived lists for filter dropdowns (client-side filtering based on current page/fetch)
    // Ideally this should be server-side, but matching Elf implementation for now
    const countries = Array.from(new Set(children.map(c => c.country).filter(Boolean))).sort();
    const cities = Array.from(new Set(
        children
            .filter(c => filterCountry === 'ALL' || c.country === filterCountry)
            .map(c => c.city)
            .filter(Boolean)
    )).sort();

    // Client-side filtering
    const filteredChildren = children.filter(child => {
        const matchesStatus = filterStatus === 'ALL' || child.status === filterStatus;
        const matchesCountry = filterCountry === 'ALL' || child.country === filterCountry;
        const matchesCity = filterCity === 'ALL' || child.city === filterCity;
        return matchesStatus && matchesCountry && matchesCity;
    });

    return (
        <div className="h-full flex flex-col p-8 overflow-hidden">
            <header className="flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h1 className="text-4xl font-santa text-white tracking-wider mb-2">CHILD DATABASE</h1>
                    <p className="text-santa-gold/60 font-mono text-sm tracking-widest flex items-center gap-2">
                         <Database size={14} />
                         GLOBAL MONITORING INDEX
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                     {/* Status Filter */}
                    <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded-lg px-2">
                        <div className={`w-2 h-2 rounded-full ${filterStatus === 'NICE' ? 'bg-green-500' : filterStatus === 'NAUGHTY' ? 'bg-red-500' : 'bg-gray-500'}`} />
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="bg-transparent text-xs text-white p-2 outline-none border-none cursor-pointer"
                        >
                            <option value="ALL" className="bg-slate-900">All Statuses</option>
                            <option value="NICE" className="bg-slate-900">Nice List</option>
                            <option value="NAUGHTY" className="bg-slate-900">Naughty List</option>
                        </select>
                    </div>

                     {/* Country Filter */}
                    <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded-lg px-2">
                        <MapPin size={14} className="text-gray-500" />
                        <select 
                            value={filterCountry}
                            onChange={(e) => {
                                setFilterCountry(e.target.value);
                                setFilterCity('ALL');
                            }}
                            className="bg-transparent text-xs text-white p-2 outline-none border-none cursor-pointer max-w-[150px]"
                        >
                            <option value="ALL" className="bg-slate-900">All Countries</option>
                            {countries.map(c => (
                                <option key={c} value={c} className="bg-slate-900">{c}</option>
                            ))}
                        </select>
                    </div>

                     {/* City Filter */}
                    <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded-lg px-2">
                        <MapPin size={14} className="text-gray-500" />
                        <select 
                            value={filterCity}
                            onChange={(e) => setFilterCity(e.target.value)}
                            className="bg-transparent text-xs text-white p-2 outline-none border-none cursor-pointer max-w-[150px]"
                        >
                            <option value="ALL" className="bg-slate-900">All Cities</option>
                            {cities.map(c => (
                                <option key={c} value={c} className="bg-slate-900">{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-santa-gold transition-colors" size={16} />
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="SEARCH IDENTITY..."
                            className="bg-black/40 border border-white/20 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-santa-gold focus:ring-1 focus:ring-santa-gold w-64 font-mono text-sm"
                        />
                    </div>
                </div>
            </header>

            {/* List */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <FestiveLoader message="Scanning Global Database..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-8 pr-2 custom-scrollbar flex-1">
                    {filteredChildren.map((child: Child) => (
                        <div 
                            key={child.id} 
                            onClick={() => handleChildClick(child.id)}
                            className={`glass-panel rounded-xl p-6 cursor-pointer group hover:border-santa-gold/50 hover:shadow-[0_0_20px_rgba(248,178,41,0.1)] transition-all relative overflow-hidden`}
                        >
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-santa text-santa-gold group-hover:scale-110 transition-transform shadow-inner-glow border border-white/20">
                                    {child.name.charAt(0)}
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                    child.status === 'NICE' 
                                        ? 'text-green-400 border-green-400/50 bg-green-400/10' 
                                        : 'text-red-400 border-red-400/50 bg-red-400/10'
                                }`}>
                                    {child.status}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-santa-gold transition-colors font-santa tracking-wide uppercase">
                                {child.name}
                            </h3>
                            
                            <p className="text-xs text-blue-300/80 mb-4 flex items-center gap-1 font-mono">
                                <MapPin size={12} />
                                {child.city}, {child.country}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-400 group-hover:text-gray-300 pt-4 border-t border-white/5">
                                <span className="uppercase tracking-widest text-[10px]">Behavior Score</span>
                                <span className={`font-mono font-bold text-lg ${child.behaviorScore > 50 ? 'text-green-400' : 'text-red-400'}`}>
                                    {child.behaviorScore}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="shrink-0 pt-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-400">
                <div>
                   Page {page} of {totalPages}
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    >
                        PREVIOUS
                    </button>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
};
