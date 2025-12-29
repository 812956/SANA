
import { useEffect, useState } from 'react';
import { Award, Clock, Shield, Lock } from 'lucide-react';
import { FestiveLoader } from '../../components/FestiveLoader';

export const ElfProfile = () => {
    const [elf, setElf] = useState<any>(null);

    useEffect(() => {
        console.log('[ElfProfile] Component mounted');
        const stored = localStorage.getItem('elf_user');
        console.log('[ElfProfile] localStorage elf_user:', stored);
        if (stored) {
            const user = JSON.parse(stored);
            console.log('[ElfProfile] Parsed user:', user);
            fetchProfile(user.id);
        } else {
            console.error('[ElfProfile] No elf_user found in localStorage!');
        }
    }, []);

    const fetchProfile = async (id: string) => {
        console.log('[ElfProfile] Fetching profile for ID:', id);
        try {
            const res = await fetch(`http://localhost:3001/api/elf/profile/${id}`);
            console.log('[ElfProfile] Response status:', res.status);
            const data = await res.json();
            console.log('[ElfProfile] Profile data received:', data);
            setElf(data);
        } catch (e) {
            console.error('[ElfProfile] Error fetching profile:', e);
        }
    };

    const [showGuide, setShowGuide] = useState(false);

    if (!elf) return <div className="h-full flex items-center justify-center"><FestiveLoader message="DECRYPTING AGENT RECORD..." /></div>;

    const RANKS = [
        { level: 1, title: 'Junior Elf', points: 0 },
        { level: 2, title: 'Mid-Senior Elf', points: 100 },
        { level: 3, title: 'Mid-Senior Elf', points: 300 },
        { level: 4, title: 'Senior Elf', points: 600 },
        { level: 5, title: 'Senior Elf', points: 1000 },
        { level: 6, title: "Santa's Right Hand", points: 2000 },
        { level: 7, title: "Santa's Right Hand", points: 5000 },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto relative">
             <div className="glass-panel rounded-3xl overflow-hidden mb-8">
                 {/* Banner */}
                 <div className="h-32 bg-gradient-to-r from-santa-red via-santa-midnight to-santa-green relative">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                 </div>
                 
                 <div className="px-8 pb-8 relative">
                     <div className="absolute -top-16 left-8">
                        <img 
                            src={elf.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${elf.name}`} 
                            alt="Avatar" 
                            className="w-32 h-32 rounded-full border-4 border-santa-midnight bg-santa-midnight/50"
                        />
                     </div>
                     
                     <div className="ml-40 pt-4 flex justify-between items-start">
                         <div>
                             <h1 className="text-3xl font-santa font-bold text-white tracking-wide">{elf.name}</h1>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="bg-santa-gold/10 text-santa-gold border border-santa-gold/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide font-orbitron">
                                    {elf.title}
                                </span>
                                <span className="text-white/40 text-sm font-mono">Agent ID: {elf.agentId}</span>
                             </div>
                         </div>
                         <div className="text-right">
                             <div className="text-3xl font-bold text-santa-gold">{elf.points}</div>
                             <div className="text-xs text-white/40 uppercase tracking-widest font-orbitron">Total Points</div>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Stats */}
                 <div className="space-y-6">
                     <section className="glass-panel rounded-2xl p-6">
                         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-orbitron">
                             <Award size={20} className="text-santa-gold" /> CAREER BADGES
                         </h3>
                         <div className="grid grid-cols-4 gap-4">
                             {/* Mock Badges */}
                            <div title="Joined The Force" className="opacity-100 grayscale-0 transition-all text-center">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl ring-1 ring-white/10">🎅</div>
                            </div>
                            <div title="First Report" className={`text-center ${elf.reports?.length > 0 ? '' : 'opacity-30 grayscale'}`}>
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl ring-1 ring-white/10">📜</div>
                            </div>
                            <div title="Level 5" className={`text-center ${elf.level >= 5 ? '' : 'opacity-30 grayscale'}`}>
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl ring-1 ring-white/10">⭐</div>
                            </div>
                             <div title="Top Earner" className="opacity-30 grayscale text-center">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl ring-1 ring-white/10">🏆</div>
                            </div>
                         </div>
                     </section>

                     <section className="glass-panel rounded-2xl p-6">
                         <div className="flex justify-between items-center mb-4">
                             <h3 className="text-lg font-bold text-white flex items-center gap-2 font-orbitron">
                                <Shield size={20} className="text-blue-400" /> CLEARANCE LEVEL
                             </h3>
                             <button onClick={() => setShowGuide(true)} className="text-xs text-blue-400 hover:text-blue-300 underline font-mono">
                                 View Progression
                             </button>
                         </div>
                         <div className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-white/5">
                             <div>
                                 <p className="text-white/40 text-[10px] uppercase tracking-wider font-orbitron">Current Clearance</p>
                                 <p className="text-xl font-bold text-white font-santa">Level {elf.level}</p>
                             </div>
                             <Lock size={24} className="text-white/20" />
                         </div>
                         <p className="text-xs text-white/40 mt-4 text-center">
                             Next clearance level unlocks at {((Math.floor(elf.points / 100) + 1) * 100)} points.
                         </p>
                     </section>
                 </div>

                 {/* Work Log */}
                 <div className="glass-panel rounded-2xl p-6 h-[500px] overflow-y-auto custom-scrollbar">
                     <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-orbitron">
                         <Clock size={20} className="text-santa-green" /> WORK HISTORY
                     </h3>
                     <div className="space-y-4">
                        {elf.workLogs?.map((log: any) => (
                            <div key={log.id} className="relative pl-6 pb-4 border-l border-white/10 last:border-0 last:pb-0">
                                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-white/20 ring-4 ring-black/40"></div>
                                <p className="text-sm text-white/80 font-medium">{log.description}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-white/40">{new Date(log.timestamp).toLocaleDateString()}</span>
                                    <span className="text-xs font-mono text-santa-green">+{log.pointsEarned} pts</span>
                                </div>
                            </div>
                        ))}
                     </div>
                 </div>
             </div>

             {/* Level Guide Modal */}
             {showGuide && (
                 <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                     <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                         <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                             <Shield className="text-blue-500" /> Clearance Levels
                         </h2>
                         <div className="space-y-3">
                             {RANKS.map((rank) => (
                                 <div key={rank.level} className={`flex justify-between items-center p-3 rounded-xl border ${elf.level === rank.level ? 'bg-blue-900/20 border-blue-500' : 'bg-slate-800 border-slate-700'}`}>
                                     <div>
                                         <div className={`font-bold ${elf.level === rank.level ? 'text-blue-400' : 'text-slate-300'}`}>
                                             Level {rank.level}: {rank.title}
                                         </div>
                                         <div className="text-xs text-slate-500">Unlocks at {rank.points} points</div>
                                     </div>
                                     {elf.level >= rank.level && <div className="text-green-500 text-xs font-bold">UNLOCKED</div>}
                                 </div>
                             ))}
                         </div>
                         <button 
                             onClick={() => setShowGuide(false)}
                             className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                         >
                             Close Guide
                         </button>
                     </div>
                 </div>
             )}
        </div>
    );
}
