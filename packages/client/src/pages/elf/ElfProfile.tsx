import { useEffect, useState } from 'react';
import { Award, Clock, Shield, Lock, Mail, Calendar, CheckSquare } from 'lucide-react';
import { FestiveLoader } from '../../components/FestiveLoader';

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
            console.error('[ElfProfile] Error fetching profile:', e);
        }
    };

    if (!elf) return <div className="h-full flex items-center justify-center"><FestiveLoader message="DECRYPTING AGENT RECORD..." /></div>;

    const RANKS = [
        { level: 1, title: 'Apprentice Elf', points: 0 },
        { level: 2, title: 'Junior Elf', points: 100 },
        { level: 3, title: 'Mid-Senior Elf', points: 500 },
        { level: 4, title: 'Senior Elf', points: 1000 },
        { level: 5, title: 'Master Elf', points: 2000 },
        { level: 6, title: 'Elder Elf', points: 5000 },
    ];

    const nextRank = RANKS.find(r => r.points > (elf.points || 0)) || { points: 'MAX' };

    return (
        <div className="p-8 max-w-7xl mx-auto relative h-full overflow-y-auto custom-scrollbar">
             <div className="glass-panel rounded-3xl overflow-hidden mb-8 shadow-2xl border border-white/10">
                 {/* Banner */}
                 <div className="h-40 bg-gradient-to-r from-santa-red via-santa-midnight to-santa-green relative">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                 </div>
                 
                 <div className="px-8 pb-8 relative flex flex-col md:flex-row items-end gap-6 -mt-16">
                     <div className="relative">
                        <div className="w-32 h-32 rounded-3xl bg-santa-midnight border-4 border-santa-midnight shadow-2xl overflow-hidden relative group">
                             {elf.avatarUrl?.startsWith('http') ? (
                                <img src={elf.avatarUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Avatar" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl">🧝</div>
                             )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-santa-gold text-santa-midnight text-xs font-bold px-2 py-1 rounded-lg border-2 border-santa-midnight shadow-lg">
                            LVL {elf.level}
                        </div>
                     </div>
                     
                     <div className="flex-1 pb-2">
                         <div className="flex flex-wrap items-start justify-between gap-4">
                             <div>
                                 <h1 className="text-4xl font-santa font-bold text-white tracking-wide drop-shadow-lg mb-2">{elf.name}</h1>
                                 <div className="flex flex-wrap items-center gap-3">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide font-orbitron border backdrop-blur-md ${
                                        elf.level >= 5 ? 'bg-santa-gold/20 text-santa-gold border-santa-gold/30 shadow-glow-gold' : 
                                        elf.level >= 3 ? 'bg-blue-400/20 text-blue-400 border-blue-400/30' :
                                        'bg-gray-400/20 text-gray-300 border-gray-400/30'
                                    }`}>
                                        {elf.title || 'Elf Unit'}
                                    </span>
                                    <span className="text-white/60 text-sm font-mono flex items-center gap-2 px-3 py-1 rounded-lg bg-black/20 border border-white/5">
                                        <Shield size={12} /> {elf.agentId || elf.id}
                                    </span>
                                 </div>
                             </div>
                             
                             <div className="text-right bg-black/20 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
                                 <div className="text-3xl font-bold text-santa-gold font-mono tracking-tighter shadow-glow-gold-text">{(elf.points || 0).toLocaleString()}</div>
                                 <div className="text-[10px] text-white/40 uppercase tracking-widest font-orbitron">Performance Score</div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Left Column */}
                 <div className="space-y-6">
                     {/* Personal Info */}
                     <section className="glass-panel rounded-2xl p-6 border border-white/10">
                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest font-orbitron flex items-center gap-2">
                             <Shield size={14} /> Personnel File
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><Shield size={18} /></div>
                                <div>
                                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Department</p>
                                    <p className="text-white font-medium">{elf.department || 'Unassigned'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400"><Mail size={18} /></div>
                                <div>
                                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Secure Comms</p>
                                    <p className="text-white font-medium truncate w-48">{elf.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 rounded-lg bg-green-500/20 text-green-400"><Calendar size={18} /></div>
                                <div>
                                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Service Start</p>
                                    <p className="text-white font-medium">{elf.joinedDate || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                     </section>

                     {/* Badges */}
                     <section className="glass-panel rounded-2xl p-6 border border-white/10">
                         <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest font-orbitron flex items-center gap-2">
                             <Award size={14} className="text-santa-gold" /> Career Badges
                         </h3>
                         <div className="flex flex-wrap gap-2">
                             {elf.badges && elf.badges.length > 0 ? (
                                 elf.badges.map((badge: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border border-yellow-700/30 rounded-lg px-3 py-2 text-xs font-bold text-yellow-200 group hover:border-yellow-500/50 transition-colors cursor-help" title={badge}>
                                        <Award size={12} className="text-santa-gold" /> {badge}
                                    </div>
                                 ))
                             ) : (
                                 <div className="text-white/30 italic text-xs w-full text-center py-4 border border-dashed border-white/10 rounded-xl">No badges earned yet.</div>
                             )}
                         </div>
                     </section>

                     {/* Clearance */}
                     <section className="glass-panel rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                         <div className="flex justify-between items-center mb-4">
                             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-orbitron flex items-center gap-2">
                                <Lock size={14} /> Clearance
                             </h3>
                             <span className="text-[10px] text-blue-400 font-mono bg-blue-900/30 px-2 py-1 rounded">SECURE</span>
                         </div>
                         <div className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-white/5 shadow-inner">
                             <div>
                                 <p className="text-white/40 text-[10px] uppercase tracking-wider font-orbitron">Current Level</p>
                                 <p className="text-lg font-bold text-white font-santa">{elf.title}</p>
                             </div>
                             <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                                 <span className="text-xl font-bold text-white/20">{elf.level}</span>
                             </div>
                         </div>
                         <p className="text-[10px] text-white/30 mt-4 text-center font-mono">
                             {nextRank.points !== 'MAX' 
                                ? `NEXT CLEARANCE AT ${Number(nextRank.points).toLocaleString()} POINTS` 
                                : "MAXIMUM CLEARANCE ACHIEVED"}
                         </p>
                         {nextRank.points !== 'MAX' && (
                             <div className="w-full bg-white/5 h-1 mt-2 rounded-full overflow-hidden">
                                 <div 
                                    className="bg-santa-gold h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${Math.min(100, (elf.points || 0) / Number(nextRank.points) * 100)}%` }}
                                 />
                             </div>
                         )}
                     </section>
                 </div>

                 {/* Right Column: Work History */}
                 <div className="lg:col-span-2 glass-panel rounded-2xl p-6 h-fit min-h-[500px] border border-white/10 relative">
                     <h3 className="text-xl font-santa text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                         <Clock className="text-gray-400" /> SERVICE RECORD
                     </h3>
                     <div className="space-y-6 relative">
                        {/* Timeline line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/5 rounded-full"></div>

                        {elf.workLogs?.map((log: any) => (
                            <div key={log.id} className="relative pl-10 group">
                                <div className={`absolute left-[14px] top-1 w-3 h-3 rounded-full border-2 border-santa-midnight z-10 ${
                                    log.pointsEarned > 0 ? 'bg-green-500' : 
                                    log.pointsEarned < 0 ? 'bg-red-500' : 'bg-blue-500'
                                } group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(0,0,0,0.5)]`}></div>
                                
                                <div className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-4 transition-all hover:translate-x-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm text-white font-medium leading-relaxed">{log.description}</p>
                                        <span className={`ml-4 text-xs font-mono font-bold whitespace-nowrap px-2 py-1 rounded bg-black/20 ${
                                            log.pointsEarned > 0 ? 'text-green-400' : 
                                            log.pointsEarned < 0 ? 'text-red-400' : 'text-blue-400'
                                        }`}>
                                            {log.pointsEarned > 0 ? '+' : ''}{log.pointsEarned} pts
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">{new Date(log.timestamp).toLocaleDateString()}</span>
                                        <span className="text-[10px] text-white/20">•</span>
                                        <span className="text-[10px] text-white/40 font-orbitron">{log.action || 'LOG ENTRY'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!elf.workLogs || elf.workLogs.length === 0) && (
                             <div className="text-center py-20">
                                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-white/20">
                                     <CheckSquare size={32} />
                                 </div>
                                 <p className="text-white/40 font-santa text-xl">No service records found.</p>
                             </div>
                        )}
                     </div>
                 </div>
             </div>
        </div>
    );
};
