import { useEffect, useState, useMemo } from 'react';
import { MapPin, Search } from 'lucide-react';
import { FestiveLoader } from '../components/FestiveLoader';
import { useNavigate } from 'react-router-dom';

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

export const ElfDatabase = () => {
    const navigate = useNavigate();
    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 12;

    // Filters
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'NICE' | 'NAUGHTY'>('ALL');
    const [filterCountry, setFilterCountry] = useState<string>('ALL');
    const [filterCity, setFilterCity] = useState<string>('ALL');

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [searchTerm, filterStatus, filterCountry, filterCity]);

    useEffect(() => {
        fetchChildren();
    }, [page, searchTerm, filterStatus, filterCountry, filterCity]);

    const fetchChildren = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('limit', limit.toString());
            if (searchTerm) params.append('search', searchTerm);
            if (filterStatus !== 'ALL') params.append('status', filterStatus);
            if (filterCountry !== 'ALL') params.append('country', filterCountry);
            if (filterCity !== 'ALL') params.append('city', filterCity);

            const res = await fetch(`http://localhost:3001/api/elf/children?${params.toString()}`);
            const data = await res.json();
            console.log('Fetched children data:', data);
            
            // Handle pagination response
            if (data.data) {
                setChildren(data.data);
                if (data.pagination) {
                    setTotalPages(data.pagination.totalPages);
                    setTotal(data.pagination.total);
                }
            } else {
                // Fallback for non-paginated response
                const list = Array.isArray(data) ? data : [];
                setChildren(list);
            }
        } catch (e) {
            console.error("Failed to fetch children", e);
        } finally {
            setLoading(false);
        }
    };

    // Derived lists for filter dropdowns (client-side filtering)
    const countries = useMemo(() => {
        const unique = new Set(children.map(c => c.country).filter(Boolean));
        return Array.from(unique).sort();
    }, [children]);

    const cities = useMemo(() => {
        const unique = new Set(children.filter(c => filterCountry === 'ALL' || c.country === filterCountry).map(c => c.city).filter(Boolean));
        return Array.from(unique).sort();
    }, [children, filterCountry]);

    // Client-side filtering (after pagination)
    const filteredChildren = children.filter(child => {
        const matchesStatus = filterStatus === 'ALL' || child.status === filterStatus;
        const matchesCountry = filterCountry === 'ALL' || child.country === filterCountry;
        const matchesCity = filterCity === 'ALL' || child.city === filterCity;

        return matchesStatus && matchesCountry && matchesCity;
    });

    const handleChildClick = (childId: string) => {
        navigate(`/elf/children/${childId}`);
    };

    return (
        <div className="h-full flex flex-col p-8 overflow-hidden">
            <header className="flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h1 className="text-4xl font-christmas text-santa-gold mb-2 drop-shadow-md">CHILDREN'S DIRECTORY</h1>
                    <p className="text-santa-silver font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                        Global Monitoring System • {total} Children
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
                                setFilterCity('ALL'); // Reset city on country change
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
                            placeholder="SEARCH CHILD..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1); 
                            }}
                            className="bg-black/40 border border-white/20 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-santa-gold focus:ring-1 focus:ring-santa-gold w-64 font-mono text-sm"
                        />
                    </div>
                </div>
            </header>

            {/* Grid */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <FestiveLoader message="Consulting the Scroll..." />
                </div>
            ) : filteredChildren.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-santa-silver font-mono">
                    No children found matching these criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-8 pr-2 custom-scrollbar flex-1">
                    {filteredChildren.map((child) => (
                        <div 
                            key={child.id} 
                            onClick={() => handleChildClick(child.id)}
                            className="glass-panel rounded-xl p-6 cursor-pointer group hover:border-santa-gold/50 hover:shadow-[0_0_20px_rgba(248,178,41,0.1)] transition-all relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full blur-2xl opacity-10 ${child.status === 'NICE' ? 'bg-green-500' : 'bg-red-500'}`} />
                            
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 shadow-lg ${
                                    child.status === 'NICE' 
                                        ? 'bg-gradient-to-br from-green-900 to-green-950 border-green-500/50 text-green-400' 
                                        : 'bg-gradient-to-br from-red-900 to-red-950 border-red-500/50 text-red-400'
                                }`}>
                                    {child.name.charAt(0)}
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border uppercase ${
                                    child.status === 'NICE' 
                                        ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                                }`}>
                                    {child.status}
                                </span>
                            </div>
                            
                            <div className="mb-4 relative z-10">
                                <div className="text-white font-bold text-lg truncate pr-2 group-hover:text-santa-gold transition-colors font-christmas tracking-wide">{child.name}</div>
                                <div className="text-santa-silver/70 text-xs font-mono flex items-center gap-1 mt-1">
                                    <MapPin size={10} />
                                    {child.city}, {child.country}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-white/5 relative z-10">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400 flex items-center gap-1 tracking-wider uppercase text-[10px]">Behavior Score</span>
                                    <span className={`font-mono font-bold ${child.behaviorScore >= 50 ? 'text-green-400' : 'text-red-400'}`}>{child.behaviorScore}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400 flex items-center gap-1 tracking-wider uppercase text-[10px]">Wishlist</span>
                                    <span className="text-white/80 font-serif italic truncate max-w-[100px]">{child.wishlist || "Unknown"}</span>
                                </div>
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
                        className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center gap-1"
                    >
                        PREVIOUS
                    </button>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center gap-1"
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
};
