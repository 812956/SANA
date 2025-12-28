
import { useEffect, useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ElfChildrenList = () => {
    const [children, setChildren] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

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



    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
             <header className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-bold text-white">Children Directory</h1>
                 <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Add New Child
                 </button>
             </header>

             {/* Filters */}
             <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex gap-4 mb-6">
                 <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                     <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, city, country..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                     />
                 </div>
                 <button className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-400 hover:text-white flex items-center gap-2">
                    <Filter size={18} /> Filters
                 </button>
             </div>

             {/* List */}
             <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Scanning global database...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                        {children.map(child => (
                            <Link to={`/elf/children/${child.id}`} key={child.id} className="block group">
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-900/10 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                                            {child.name.charAt(0)}
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold bg-slate-900 border ${child.status === 'NICE' ? 'text-green-400 border-green-900' : child.status === 'NAUGHTY' ? 'text-red-400 border-red-900' : 'text-amber-400 border-amber-900'}`}>
                                            {child.status}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-1">{child.name}</h3>
                                    <div className="flex items-center text-slate-400 text-sm mb-4">
                                        <MapPin size={14} className="mr-1" />
                                        {child.city}, {child.country}
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                                        <div className="text-xs text-slate-500">Behavior Score</div>
                                        <div className="text-lg font-mono font-bold text-white">{child.behaviorScore}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
             </div>
        </div>
    );
};
