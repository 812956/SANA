import { X, AlertTriangle, Gift, Ban, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FestiveLoader } from './FestiveLoader';

interface Child {
    id: string;
    name: string;
    city: string;
    country: string;
    age: number;
    status: 'NICE' | 'NAUGHTY';
    behaviorScore: number;
    wishlist: string;
    img?: string;
    reports?: any[];
}

interface Props {
    child: Child | null;
    onClose: () => void;
    onApprove: () => void; // Mark Nice
    onReview: () => void;  // Mark Naughty
}

export const ChildProfileModal = ({ child: initialChild, onClose, onApprove, onReview }: Props) => {
    const [child, setChild] = useState<Child | null>(initialChild);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialChild?.id) {
            setChild(initialChild); // Reset to initial while fetching
            fetchChildDetails(initialChild.id);
        }
    }, [initialChild?.id]);

    const fetchChildDetails = async (id: string) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/api/children/${id}`);
            if (res.ok) {
                const data = await res.json();
                setChild(prev => ({ ...prev, ...data })); // Merge initial data with full details
            }
        } catch (e) {
            console.error("Failed to fetch child details", e);
        } finally {
            setLoading(false);
        }
    };

    if (!initialChild) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute top-20 right-4 w-96 bg-black/90 border border-cyber-blue/50 backdrop-blur-xl rounded-lg shadow-2xl z-[2000] overflow-hidden flex flex-col max-h-[80vh]"
            >
                {/* Header */}
                <div className={`p-4 border-b ${child?.status === 'NICE' ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10'} flex justify-between items-start shrink-0`}>
                    <div>
                        <div className="text-[10px] text-gray-400 font-mono mb-1">TARGET IDENTIFIED</div>
                        <h2 className="text-xl font-orbitron font-bold leading-none">{child?.name}</h2>
                        <div className="flex items-center gap-2 mt-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${child?.status === 'NICE' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                                {child?.status}
                            </span>
                            <span className="text-xs font-mono text-gray-400">{child?.city}, {child?.country}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                    
                    {loading ? (
                         <div className="py-8">
                            <FestiveLoader message="ANALYZING BEHAVIOR..." size="sm" />
                        </div>
                    ) : (
                        <>
                            {/* Score */}
                            <div className="bg-white/5 rounded p-3 border border-white/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-cyber-blue flex items-center gap-1">
                                        <AlertTriangle size={12} /> BEHAVIOR SCORE
                                    </span>
                                    <span className="font-mono text-xl font-bold">{child?.behaviorScore}%</span>
                                </div>
                                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${child?.status === 'NICE' ? 'bg-green-500' : 'bg-red-500'}`} 
                                        style={{ width: `${child?.behaviorScore}%` }}
                                    />
                                </div>
                            </div>

                            {/* Wishlist */}
                            <div className="space-y-1">
                                <div className="text-[10px] text-gray-500 font-bold tracking-wider">REQUESTED ITEM</div>
                                <div className="flex items-center gap-3 text-sm p-2 bg-cyber-blue/5 rounded border border-cyber-blue/20 text-cyber-blue">
                                    <Gift size={16} />
                                    {child?.wishlist || "None recorded"}
                                </div>
                            </div>

                            {/* Decision UI */}
                             <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                                <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-2 text-center">SANTA OVERRIDE PROTOCOL</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => { onApprove(); onClose(); }}
                                        className="bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 p-2 rounded text-xs font-bold transition flex justify-center items-center gap-2"
                                    >
                                        <Heart size={14} /> MARK NICE
                                    </button>
                                    <button 
                                        onClick={() => { onReview(); onClose(); }}
                                        className="bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 p-2 rounded text-xs font-bold transition flex justify-center items-center gap-2"
                                    >
                                         <Ban size={14} /> MARK NAUGHTY
                                    </button>
                                </div>
                            </div>

                            {/* History */}
                            <div className="space-y-2">
                                 <div className="text-[10px] text-gray-500 font-bold tracking-wider">RECENT ACTIVITIES</div>
                                 <div className="space-y-2">
                                    {child?.reports && child.reports.length > 0 ? (
                                        child.reports.slice(0, 5).map((report: any, i: number) => (
                                            <div key={i} className="text-xs text-gray-400 font-mono bg-white/5 p-2 rounded border border-white/5">
                                                <div className="flex gap-2 justify-between mb-1">
                                                    <span className={`font-bold ${report.type === 'NICE' ? 'text-green-500' : 'text-red-500'}`}>{report.type}</span>
                                                    <span className="opacity-50">{new Date(report.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                                <div className="opacity-80">{report.description}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-xs text-gray-600 italic text-center py-2">No recent anomalies detected.</div>
                                    )}
                                 </div>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
