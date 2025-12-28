
import { useEffect, useState } from 'react';
import { Award, Clock, Shield, Lock } from 'lucide-react';

export const ElfProfile = () => {
    const [elf, setElf] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('elf_user');
        if (stored) {
            const user = JSON.parse(stored);
            fetchProfile(user.id);
        }
    }, []);

    const fetchProfile = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3001/api/elf/profile/${id}`);
            const data = await res.json();
            setElf(data);
        } catch (e) {
            console.error(e);
        }
    };

    if (!elf) return <div className="p-8 text-white">Loading dossier...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
             <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden mb-8">
                 {/* Banner */}
                 <div className="h-32 bg-gradient-to-r from-red-900 via-slate-900 to-slate-900 relative">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                 </div>
                 
                 <div className="px-8 pb-8 relative">
                     <div className="absolute -top-16 left-8">
                        <img 
                            src={elf.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${elf.name}`} 
                            alt="Avatar" 
                            className="w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-700"
                        />
                     </div>
                     
                     <div className="ml-40 pt-4 flex justify-between items-start">
                         <div>
                             <h1 className="text-3xl font-bold text-white">{elf.name}</h1>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {elf.title}
                                </span>
                                <span className="text-slate-400 text-sm">Agent ID: {elf.agentId}</span>
                             </div>
                         </div>
                         <div className="text-right">
                             <div className="text-3xl font-bold text-white">{elf.points}</div>
                             <div className="text-xs text-slate-500 uppercase tracking-wider">Total Points</div>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Stats */}
                 <div className="space-y-6">
                     <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                             <Award size={20} className="text-amber-500" /> Career Badges
                         </h3>
                         <div className="grid grid-cols-4 gap-4">
                             {/* Mock Badges */}
                            <div title="Joined The Force" className="opacity-100 grayscale-0 transition-all text-center">
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">🎅</div>
                            </div>
                            <div title="First Report" className={`text-center ${elf.reports?.length > 0 ? '' : 'opacity-30 grayscale'}`}>
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">📜</div>
                            </div>
                            <div title="Level 5" className={`text-center ${elf.level >= 5 ? '' : 'opacity-30 grayscale'}`}>
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">⭐</div>
                            </div>
                             <div title="Top Earner" className="opacity-30 grayscale text-center">
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">🏆</div>
                            </div>
                         </div>
                     </section>

                     <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Shield size={20} className="text-blue-500" /> Clearance Level
                         </h3>
                         <div className="flex items-center justify-between bg-slate-900 rounded-xl p-4 border border-slate-800">
                             <div>
                                 <p className="text-slate-400 text-sm">Current Clearance</p>
                                 <p className="text-xl font-bold text-white">Level {elf.level}</p>
                             </div>
                             <Lock size={24} className="text-slate-600" />
                         </div>
                         <p className="text-xs text-slate-500 mt-4 text-center">
                             Next clearance level unlocks at {((Math.floor(elf.points / 100) + 1) * 100)} points.
                         </p>
                     </section>
                 </div>

                 {/* Work Log */}
                 <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-[500px] overflow-y-auto">
                     <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                         <Clock size={20} className="text-green-500" /> Work History
                     </h3>
                     <div className="space-y-4">
                        {elf.workLogs?.map((log: any) => (
                            <div key={log.id} className="relative pl-6 pb-4 border-l border-slate-700 last:border-0 last:pb-0">
                                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-600 ring-4 ring-slate-800"></div>
                                <p className="text-sm text-slate-300 font-medium">{log.description}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleDateString()}</span>
                                    <span className="text-xs font-mono text-green-400">+{log.pointsEarned} pts</span>
                                </div>
                            </div>
                        ))}
                     </div>
                 </div>
             </div>
        </div>
    );
}
