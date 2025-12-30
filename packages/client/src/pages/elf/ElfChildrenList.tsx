
import { useEffect, useState } from 'react';
import { Search, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FestiveLoader } from '../../components/FestiveLoader';
import { useSantaAI } from '../../context/SantaAIContext';
// import { useNavigate } from 'react-router-dom';

export const ElfChildrenList = () => {
    const [children, setChildren] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const LIMIT = 12;

    const { registerTool, unregisterTool } = useSantaAI();

    // AI Tool Registration
    useEffect(() => {
        registerTool('filter_children', (params: any) => {
            if (params.search) {
                setSearch(params.search);
            }
            // Add other filters if API supports them (e.g. city/country)
        });

        registerTool('open_profile', (params: any) => {
             // Find child by name (optimistic) or search
             // For now, we set search which triggers list update
             setSearch(params.name);
             
             // If we had a mechanism to know the ID immediately we would navigate
             // But search is async. We can try to automate "click first result" logic?
             // For now, let's just search.
        });

        return () => {
            unregisterTool('filter_children');
            unregisterTool('open_profile');
        };
    }, []);

    useEffect(() => {
        setPage(1); // Reset page on search change
        fetchChildren(1);
    }, [search]);

    useEffect(() => {
        fetchChildren(page);
    }, [page]);

    const fetchChildren = async (pageNum: number) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (search) query.append('search', search);
            query.append('page', pageNum.toString());
            query.append('limit', LIMIT.toString());

            const res = await fetch(`http://localhost:3001/api/elf/children?${query.toString()}`);
            const data = await res.json();
            setChildren(data.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
             <header className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-santa font-bold text-white tracking-wide">CHILDREN DIRECTORY</h1>
                 <Link to="/elf/create-child" className="bg-santa-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-red-900/20 font-orbitron text-sm">
                    <User size={18} />
                    ADD NEW CHILD
                 </Link>
             </header>

             {/* Filters */}
             <div className="glass-panel p-4 rounded-2xl flex gap-4 mb-6">
                 <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                     <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, city, country..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-santa-gold focus:ring-1 focus:ring-santa-gold transition-all placeholder-white/30"
                     />
                 </div>
             </div>

             {/* List */}
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <FestiveLoader message="SCANNING GLOBAL DATABASE..." />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                            {children.map(child => (
                                <Link to={`/elf/children/${child.id}`} key={child.id} className="block group">
                                    <div className="glass-panel rounded-2xl p-5 hover:border-santa-gold/50 hover:shadow-[0_0_20px_rgba(248,178,41,0.1)] transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-santa text-santa-gold">
                                                {child.name.charAt(0)}
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${child.status === 'NICE' ? 'text-santa-green border-santa-green bg-santa-green/10' : child.status === 'NAUGHTY' ? 'text-santa-red border-santa-red bg-santa-red/10' : 'text-santa-gold border-santa-gold bg-santa-gold/10'}`}>
                                                {child.status}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-santa-gold transition-colors mb-1 font-santa tracking-wide">{child.name}</h3>
                                        <div className="flex items-center text-white/60 text-sm mb-4">
                                            <MapPin size={14} className="mr-1" />
                                            {child.city}, {child.country}
                                        </div>
                                        
                                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                            <div className="text-xs text-white/40 uppercase tracking-widest font-orbitron">Behavior Score</div>
                                            <div className={`text-lg font-mono font-bold ${child.behaviorScore > 50 ? 'text-santa-green' : 'text-santa-red'}`}>{child.behaviorScore}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-4 py-4 border-t border-white/10">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded bg-white/5 text-white disabled:opacity-50 hover:bg-white/10 border border-white/10"
                            >
                                Previous
                            </button>
                            <span className="text-santa-gold font-mono">Page {page}</span>
                            <button 
                                onClick={() => setPage(p => p + 1)}
                                disabled={children.length < LIMIT}
                                className="px-4 py-2 rounded bg-white/5 text-white disabled:opacity-50 hover:bg-white/10 border border-white/10"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
             </div>
        </div>
    );
};
