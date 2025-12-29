import { useEffect, useState } from 'react';
import { Gift, Award, TrendingUp, Activity, User } from 'lucide-react';
import { FestiveLoader } from '../../components/FestiveLoader';

export const ElfDashboard = () => {
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

    if (!elf) return (
        <div className="flex items-center justify-center h-full">
            <FestiveLoader message="RETRIEVING ELF DOSSIER..." />
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-santa font-bold text-white mb-2 tracking-wide">MY STATION</h1>
                    <p className="text-white/60 font-orbitron text-sm">Welcome back, <span className="text-santa-red font-bold">{elf.name}</span>. Ready to make some magic?</p>
                </div>
                <div className="flex items-center gap-4">
                     <div className="text-right">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-orbitron">Current Rank</p>
                        <p className="font-bold text-santa-gold font-santa text-lg">{elf.title}</p>
                     </div>
                     <div className="w-12 h-12 bg-santa-gold/10 border border-santa-gold/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(248,178,41,0.2)]">
                        <Award className="text-santa-gold" size={24} />
                     </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Gift size={64} className="text-santa-red" /></div>
                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1 font-orbitron">Total Points</h3>
                    <p className="text-4xl font-bold text-white font-santa">{elf.points.toLocaleString()}</p>
                    <div className="mt-4 text-xs text-santa-green flex items-center gap-1 font-mono">
                        <TrendingUp size={12} /> +{elf.workLogs?.length * 10 || 0} this season
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><User size={64} className="text-santa-gold" /></div>
                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1 font-orbitron">Level Progress</h3>
                    <p className="text-4xl font-bold text-white font-santa">Lvl {elf.level}</p>
                    <div className="w-full bg-black/40 h-1.5 mt-4 rounded-full overflow-hidden border border-white/5">
                         <div className="bg-santa-gold h-full rounded-full shadow-[0_0_10px_rgba(248,178,41,0.5)]" style={{ width: `${(elf.points % 100)}%` }}></div>
                    </div>
                    <p className="text-[10px] text-white/40 mt-2 text-right font-mono">{100 - (elf.points % 100)} pts to next level</p>
                </div>

                 <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Activity size={64} className="text-santa-green" /></div>
                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1 font-orbitron">Reports Count</h3>
                    <p className="text-4xl font-bold text-white font-santa">{elf.reports?.length || 0}</p>
                    <p className="text-[10px] text-white/40 mt-4 uppercase tracking-widest font-orbitron">Lifetime reports submit</p>
                </div>
            </div>

            <section>
                 <h2 className="text-xl font-bold text-white mb-4 font-santa tracking-wide">RECENT ACTIVITY</h2>
                 <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
                      {elf.workLogs?.length > 0 ? (
                        <div className="divide-y divide-white/5">
                             {elf.workLogs.map((log: any) => (
                                <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                     <div className={`p-2 rounded-lg ${log.action === 'REPORT' ? 'bg-santa-green/10 text-santa-green border border-santa-green/20' : 'bg-santa-gold/10 text-santa-gold border border-santa-gold/20'}`}>
                                        <Activity size={16} />
                                     </div>
                                     <div className="flex-1">
                                        <p className="text-sm font-medium text-white/90">{log.description}</p>
                                        <p className="text-xs text-white/40 font-mono">{new Date(log.timestamp).toLocaleString()}</p>
                                     </div>
                                     <div className="text-sm font-mono text-santa-green font-bold">+{log.pointsEarned} pts</div>
                                </div>
                             ))}
                        </div>
                      ) : (
                          <div className="p-8 text-center text-white/40 font-orbitron">NO RECENT ACTIVITY DETECTED.</div>
                      )}
                 </div>
            </section>
        </div>
    )
}
