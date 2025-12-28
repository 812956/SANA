
import { useEffect, useState } from 'react';
import { Gift, Award, TrendingUp, Activity, User } from 'lucide-react';

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
        <div className="flex items-center justify-center h-full text-slate-500">
            <Activity className="animate-spin mr-2" /> Loading Profile...
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-end border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Station</h1>
                    <p className="text-slate-400">Welcome back, <span className="text-red-400">{elf.name}</span>. Ready to make some magic?</p>
                </div>
                <div className="flex items-center gap-4">
                     <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Current Rank</p>
                        <p className="font-bold text-amber-400">{elf.title}</p>
                     </div>
                     <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center">
                        <Award className="text-amber-500" size={24} />
                     </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Gift size={64} /></div>
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Total Points</h3>
                    <p className="text-4xl font-bold text-white">{elf.points.toLocaleString()}</p>
                    <div className="mt-4 text-xs text-green-400 flex items-center gap-1">
                        <TrendingUp size={12} /> +{elf.workLogs?.length * 10 || 0} this season
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10"><User size={64} /></div>
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Level Progress</h3>
                    <p className="text-4xl font-bold text-white">Lvl {elf.level}</p>
                    <div className="w-full bg-slate-700 h-1.5 mt-4 rounded-full overflow-hidden">
                         <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(elf.points % 100)}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">{100 - (elf.points % 100)} pts to next level</p>
                </div>

                 <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={64} /></div>
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Reports Count</h3>
                    <p className="text-4xl font-bold text-white">{elf.reports?.length || 0}</p>
                    <p className="text-xs text-slate-500 mt-4">Lifetime reports submit</p>
                </div>
            </div>

            <section>
                 <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                 <div className="bg-slate-800/30 border border-slate-800 rounded-2xl overflow-hidden">
                      {elf.workLogs?.length > 0 ? (
                        <div className="divide-y divide-slate-800">
                             {elf.workLogs.map((log: any) => (
                                <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                                     <div className={`p-2 rounded-lg ${log.action === 'REPORT' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        <Activity size={16} />
                                     </div>
                                     <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-200">{log.description}</p>
                                        <p className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</p>
                                     </div>
                                     <div className="text-sm font-mono text-green-400">+{log.pointsEarned} pts</div>
                                </div>
                             ))}
                        </div>
                      ) : (
                          <div className="p-8 text-center text-slate-500">No recent activity found.</div>
                      )}
                 </div>
            </section>
        </div>
    )
}
