import { X, Check, AlertTriangle, Gift, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Child {
    id: string;
    name: string;
    city: string;
    age: number;
    status: 'NICE' | 'NAUGHTY';
    naughtyScore: number;
    wishlist: string;
    img?: string;
}

interface Props {
    child: Child | null;
    onClose: () => void;
    onApprove: () => void;
    onReview: () => void;
}

export const ChildProfileModal = ({ child, onClose, onApprove, onReview }: Props) => {
    if (!child) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute top-20 right-4 w-80 bg-black/90 border border-cyber-blue/50 backdrop-blur-xl rounded-lg shadow-2xl z-[2000] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className={`p-4 border-b ${child.status === 'NICE' ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10'} flex justify-between items-start`}>
                    <div>
                        <div className="text-[10px] text-gray-400 font-mono mb-1">TARGET IDENTIFIED</div>
                        <h2 className="text-xl font-orbitron font-bold leading-none">{child.name}</h2>
                        <div className="flex items-center gap-2 mt-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${child.status === 'NICE' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                                {child.status}
                            </span>
                            <span className="text-xs font-mono text-gray-400">{child.city}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    
                    {/* Score */}
                    <div className="bg-white/5 rounded p-3 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-cyber-blue flex items-center gap-1">
                                <AlertTriangle size={12} /> BEHAVIOR SCORE
                            </span>
                            <span className="font-mono text-xl font-bold">{child.naughtyScore}%</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${child.status === 'NICE' ? 'bg-green-500' : 'bg-red-500'}`} 
                                style={{ width: `${child.naughtyScore}%` }}
                            />
                        </div>
                    </div>

                    {/* Wishlist */}
                    <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 font-bold tracking-wider">REQUESTED ITEM</div>
                        <div className="flex items-center gap-3 text-sm p-2 bg-cyber-blue/5 rounded border border-cyber-blue/20 text-cyber-blue">
                            <Gift size={16} />
                            {child.wishlist}
                        </div>
                    </div>

                    {/* History */}
                    <div className="space-y-1">
                         <div className="text-[10px] text-gray-500 font-bold tracking-wider">RECENT ACTIVITIES</div>
                         <div className="text-xs text-gray-400 space-y-1 font-mono">
                            <div className="flex gap-2">
                                <span className="opacity-50">10:42</span>
                                <span>Detected in school zone</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="opacity-50">09:15</span>
                                <span>Shared lunch (Positive)</span>
                            </div>
                         </div>
                    </div>

                </div>

                {/* Actions */}
                <div className="p-4 border-t border-white/10 grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => { onApprove(); onClose(); }}
                        className="bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 p-2 rounded text-xs font-bold transition flex justify-center items-center gap-2"
                    >
                        <Check size={14} /> APPROVE
                    </button>
                    <button 
                        onClick={() => { onReview(); onClose(); }}
                        className="bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 p-2 rounded text-xs font-bold transition flex justify-center items-center gap-2"
                    >
                         <History size={14} /> REVIEW
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
