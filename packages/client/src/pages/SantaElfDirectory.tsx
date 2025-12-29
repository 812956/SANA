import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Star, Award, Zap, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { FestiveLoader } from '../components/FestiveLoader';
import type { Elf } from '../types';

interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const SantaElfDirectory = () => {
    const navigate = useNavigate();
    const [elves, setElves] = useState<Elf[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({ total: 0, page: 1, limit: 12, totalPages: 1 });
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLevel, setFilterLevel] = useState<string>('ALL');
    const [filterDept, setFilterDept] = useState<string>('ALL');

    const fetchElves = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({
                page: meta.page.toString(),
                limit: meta.limit.toString(),
                search: searchTerm,
                level: filterLevel,
                department: filterDept
            });
            const res = await fetch(`http://localhost:3001/api/elves?${query}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                // Handle legacy/stale backend response (flat array)
                setElves(data);
                setMeta({ total: data.length, page: 1, limit: data.length, totalPages: 1 });
            } else {
                // Handle new paginated response
                setElves(data.data || []);
                if (data.meta) setMeta(data.meta);
            }
        } catch (e) {
            console.error("Failed to fetch elves", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search
        const timeout = setTimeout(() => {
            fetchElves();
        }, 300);
        return () => clearTimeout(timeout);
    }, [meta.page, searchTerm, filterLevel, filterDept]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= meta.totalPages) {
            setMeta(prev => ({ ...prev, page: newPage }));
        }
    };

    const getLevelColor = (level: number) => {
        if (level >= 7) return 'text-purple-400 border-purple-400/50 bg-purple-400/10'; // Elder
        if (level >= 5) return 'text-santa-gold border-santa-gold/50 bg-santa-gold/10'; // Master
        if (level >= 4) return 'text-blue-400 border-blue-400/50 bg-blue-400/10'; // Senior
        if (level >= 2) return 'text-green-400 border-green-400/50 bg-green-400/10'; // Junior
        return 'text-gray-400 border-gray-400/50 bg-gray-400/10'; // Apprentice
    };

    return (
        <div className="h-full flex flex-col p-8 overflow-hidden">
            <header className="flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h1 className="text-4xl font-santa text-white tracking-wider mb-2">ELF DIRECTORY</h1>
                    <p className="text-santa-gold/60 font-mono text-sm tracking-widest">
                        PERSONNEL MANAGEMENT // LEVEL {meta.total} UNITS ACTIVE
                    </p>
                </div>
                
                <div className="flex items-center gap-4">


                    {/* Level Filter */}
                    <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded-lg px-2">
                         <Award size={14} className="text-gray-500" />
                        <select 
                            value={filterLevel} 
                            onChange={(e) => { setFilterLevel(e.target.value); setMeta(m => ({...m, page: 1})); }}
                            className="bg-transparent text-xs text-white p-2 outline-none border-none"
                        >
                            <option value="ALL">All Levels</option>
                            <option value="Apprentice">Apprentice</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Master">Master</option>
                            <option value="Elder">Elder</option>
                        </select>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded-lg px-2">
                        <Filter size={14} className="text-gray-500" />
                        <select 
                            value={filterDept} 
                            onChange={(e) => { setFilterDept(e.target.value); setMeta(m => ({...m, page: 1})); }}
                            className="bg-transparent text-xs text-white p-2 outline-none border-none"
                        >
                            <option value="ALL">All Depts</option>
                            <option value="Toy Making">Toy Making</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Reindeer Care">Reindeer Care</option>
                            <option value="Sleigh Maintenance">Sleigh Ops</option>
                        </select>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-santa-gold transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="SEARCH PERSONNEL..." 
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setMeta(m => ({...m, page: 1})); }}
                            className="bg-black/40 border border-white/20 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-santa-gold focus:ring-1 focus:ring-santa-gold w-64 font-mono text-sm"
                        />
                    </div>
                </div>
            </header>

            {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                    <FestiveLoader message="Scanning database..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-8 pr-2 custom-scrollbar flex-1">
                    {elves.map(elf => (
                        <div 
                            key={elf.id}
                            onClick={() => navigate(`/elves/${elf.id}`)}
                            className="glass-panel rounded-xl p-6 cursor-pointer group hover:border-santa-gold/50 hover:shadow-[0_0_20px_rgba(248,178,41,0.1)] transition-all relative overflow-hidden"
                        >
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Star size={64} />
                            </div>

                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="text-4xl filter drop-shadow-lg">
                                    {/* Avatar/Emoji fallback */}
                                    {elf.avatarUrl?.startsWith('http') ? (
                                        <img src={elf.avatarUrl} className="w-12 h-12 rounded-full border border-white/20" alt="Avatar" />
                                    ) : (
                                        <span className="text-4xl">🧝</span>
                                    )}
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getLevelColor(elf.level)}`}>
                                   Level {elf.level}
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-santa-gold transition-colors font-santa tracking-wide">{elf.name}</h3>
                                <p className="text-xs text-blue-300/80 mb-4 flex items-center gap-1">
                                    <Shield size={12} /> {elf.department}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-400 group-hover:text-gray-300">
                                    <div className="flex items-center gap-1">
                                        <Award size={14} className="text-yellow-500" />
                                        <span>{elf.points?.toLocaleString()} pts</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Zap size={14} className={elf.status === 'ONLINE' || elf.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'} />
                                        <span>{elf.status}</span>
                                    </div>
                                </div>

                                {/* Password Section - Reveal on Hover */}
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                        Access Code <span className="text-[10px] text-santa-red/50 opacity-0 group-hover:opacity-100 transition-opacity">(HOVER TO REVEAL)</span>
                                    </p>
                                    <div className="font-mono text-sm h-6 overflow-hidden relative">
                                        {/* Masked Password */}
                                        <span className="absolute inset-0 text-gray-500 group-hover:opacity-0 transition-opacity duration-200">
                                            •••••••••••••••
                                        </span>
                                        {/* Real Password */}
                                        <span className="absolute inset-0 text-santa-red opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-all font-bold tracking-wider">
                                            {elf.password}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="shrink-0 pt-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-400">
                <div>
                   Page {meta.page} of {meta.totalPages}
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handlePageChange(meta.page - 1)}
                        disabled={meta.page <= 1}
                        className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={() => handlePageChange(meta.page + 1)}
                        disabled={meta.page >= meta.totalPages}
                        className="p-2 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
