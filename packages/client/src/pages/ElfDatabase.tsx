import { useEffect, useState, useMemo } from 'react';
import { MapPin, Search, Star, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const limit = 50;

    // Filters
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'NICE' | 'NAUGHTY'>('ALL');
    const [filterCountry, setFilterCountry] = useState<string>('ALL');
    const [filterCity, setFilterCity] = useState<string>('ALL');

    useEffect(() => {
        fetchChildren();
    }, [page, searchTerm]);

    const fetchChildren = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('limit', limit.toString());
            if (searchTerm) params.append('search', searchTerm);

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
        <div className="flex-1 bg-santa-midnight p-8 overflow-y-auto relative h-full">
            <header className="mb-8 flex justify-between items-end border-b border-santa-gold/20 pb-6">
                <div>
                    <h1 className="text-4xl font-christmas text-santa-gold mb-2 drop-shadow-md">Children's Directory</h1>
                    <p className="text-santa-silver font-mono text-sm tracking-widest uppercase">Global Monitoring System • {total} Children</p>
                </div>
                <div className="flex items-center gap-2">
                     <span className="bg-santa-red/20 border border-santa-red/50 text-santa-red px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                         LIVE CONNECTION
                     </span>
                </div>
            </header>

            {/* Controls */}
            <div className="bg-gradient-to-r from-santa-red/10 to-transparent p-6 rounded-2xl border border-santa-red/20 mb-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-santa-gold/50" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find Child..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1); // Reset to first page on search
                            }}
                            className="w-full bg-santa-midnight/80 border border-santa-gold/30 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-santa-gold font-mono text-sm placeholder:text-santa-silver/30"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="w-full bg-santa-midnight/80 border border-santa-gold/30 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-santa-gold font-mono text-sm appearance-none cursor-pointer hover:bg-santa-midnight"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="NICE">Nice List</option>
                            <option value="NAUGHTY">Naughty List</option>
                        </select>
                    </div>

                    {/* Country Filter */}
                    <div>
                        <select 
                            value={filterCountry}
                            onChange={(e) => {
                                setFilterCountry(e.target.value);
                                setFilterCity('ALL'); // Reset city on country change
                            }}
                            className="w-full bg-santa-midnight/80 border border-santa-gold/30 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-santa-gold font-mono text-sm appearance-none cursor-pointer"
                        >
                            <option value="ALL">All Countries</option>
                            {countries.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* City Filter */}
                    <div>
                        <select 
                            value={filterCity}
                            onChange={(e) => setFilterCity(e.target.value)}
                            className="w-full bg-santa-midnight/80 border border-santa-gold/30 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-santa-gold font-mono text-sm appearance-none cursor-pointer"
                        >
                            <option value="ALL">All Cities</option>
                            {cities.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                {loading ? (
                    <div className="col-span-full text-center py-20">
                         <div className="text-santa-gold text-xl font-christmas animate-bounce">Consulting the Scroll...</div>
                    </div>
                ) : filteredChildren.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-santa-silver font-mono">
                        No children found matching these criteria.
                    </div>
                ) : filteredChildren.map((child) => (
                    <div 
                        key={child.id} 
                        onClick={() => handleChildClick(child.id)}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group hover:border-santa-gold/50 cursor-pointer relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full blur-xl opacity-20 ${child.status === 'NICE' ? 'bg-green-500' : 'bg-red-500'}`} />
                        
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
                                child.status === 'NICE' 
                                    ? 'bg-gradient-to-br from-green-900 to-green-950 border-green-500/50 text-green-400' 
                                    : 'bg-gradient-to-br from-red-900 to-red-950 border-red-500/50 text-red-400'
                            }`}>
                                {child.name.charAt(0)}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border shadow-lg ${
                                child.status === 'NICE' 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                            }`}>
                                {child.status}
                            </span>
                        </div>
                        
                        <div className="mb-4 relative z-10">
                            <div className="text-white font-bold text-lg truncate pr-2 group-hover:text-santa-gold transition-colors">{child.name}</div>
                            <div className="text-santa-silver/70 text-xs font-mono flex items-center gap-1 mt-1">
                                <MapPin size={10} />
                                {child.city}, {child.country}
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-white/5 relative z-10">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400 flex items-center gap-1"><Star size={12} className="text-santa-gold"/> Behavior Score</span>
                                <span className={`font-mono font-bold ${child.behaviorScore >= 50 ? 'text-green-400' : 'text-red-400'}`}>{child.behaviorScore}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400 flex items-center gap-1"><Gift size={12} className="text-santa-red"/> Wishlist</span>
                                <span className="text-white/80 font-serif italic truncate max-w-[100px]">{child.wishlist || "Unknown"}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-6 border-t border-santa-gold/20">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-santa-midnight border border-santa-gold/30 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-santa-gold/10 hover:border-santa-gold transition-all"
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </button>
                    <span className="text-santa-silver font-mono text-sm">
                        Page {page} of {totalPages}
                    </span>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-santa-midnight border border-santa-gold/30 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-santa-gold/10 hover:border-santa-gold transition-all"
                    >
                        Next
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};
