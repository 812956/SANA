import { useEffect, useState } from 'react';
import { User, Award, TrendingUp, Activity, Star, Shield, Zap, Target } from 'lucide-react';

export const ElfProfile = () => {
    const [elf, setElf] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('elf_user');
        if (stored) {
            const user = JSON.parse(stored);
            fetchProfile(user.id);
        } else {
             setLoading(false);
        }
    }, []);

    const fetchProfile = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3001/api/elf/profile/${id}`);
            const data = await res.json();
            setElf(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="h-full flex items-center justify-center text-slate-500">
            <Activity className="animate-spin mr-2" /> Authenticating Personnel...
        </div>
    );

    if (!elf) return <div className="p-8 text-white">Profile Access Denied.</div>;

    // Gamification Calculations
    const currentPoints = elf.points || 0;
    const nextLevelThreshold = (Math.floor(currentPoints / 100) + 1) * 100;
    const prevLevelThreshold = Math.floor(currentPoints / 100) * 100;
    const progressPercent = ((currentPoints - prevLevelThreshold) / (nextLevelThreshold - prevLevelThreshold)) * 100;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 h-full overflow-y-auto custom-scrollbar">
            {/* ID Card Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <User size={200} />
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-xl">
                        <span className="text-4xl font-bold text-white">{elf.name.charAt(0)}</span>
                    </div>
                    
                    <div className="text-center md:text-left flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                            <h1 className="text-4xl font-black text-white">{elf.name}</h1>
                            <div className="px-4 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Award size={14} /> {elf.title}
                            </div>
                        </div>
                        <p className="text-slate-400 font-mono">ID: {elf.id.toUpperCase()} • Clearance: Level {elf.level}</p>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Career Score</p>
                        <p className="text-5xl font-black text-white">{currentPoints.toLocaleString()}</p>
                    </div>
                </div>

                {/* Level Progress */}
                <div className="mt-8 bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50">
                    <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                        <span>Level {elf.level}</span>
                        <span>Level {elf.level + 1}</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                         <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercent}%` }}
                         >
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                         </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                        <span>{currentPoints} XP</span>
                        <span className="text-cyan-400">{nextLevelThreshold - currentPoints} XP to promotion</span>
                        <span>{nextLevelThreshold} XP</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Stats Grid */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
                        <Activity className="text-blue-400 mb-4" size={32} />
                        <h3 className="text-slate-400 text-sm font-bold uppercase">Total Reports</h3>
                        <p className="text-3xl font-bold text-white mt-1">{elf.workLogs?.filter((l: any) => l.action === 'REPORT').length || 0}</p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
                        <TrendingUp className="text-green-400 mb-4" size={32} />
                        <h3 className="text-slate-400 text-sm font-bold uppercase">Points Today</h3>
                        <p className="text-3xl font-bold text-white mt-1">
                             {/* Mock calculation for today */}
                             {elf.workLogs?.filter((l: any) => new Date(l.timestamp).toDateString() === new Date().toDateString())
                                .reduce((acc: number, curr: any) => acc + (curr.pointsEarned || 0), 0) || 0}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl sm:col-span-2">
                         <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Zap size={18} className="text-amber-400"/> Recent Activity Log</h3>
                         <div className="space-y-3">
                            {elf.workLogs?.slice(0, 5).map((log: any) => (
                                <div key={log.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                            <Target size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-200 font-medium">{log.description}</p>
                                            <p className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <span className="text-green-400 font-mono font-bold">+{log.pointsEarned}</span>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>

                {/* Badges / Awards */}
                <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <Shield size={18} className="text-purple-400" /> Service Medals
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Mock Badges */}
                        <div className="aspect-square bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4 border border-slate-700 group hover:border-purple-500/50 transition-colors">
                            <Star className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" size={32} fill="currentColor" />
                            <p className="text-xs text-center font-bold text-white">First Watch</p>
                            <p className="text-[10px] text-slate-500 text-center mt-1">Joined the Force</p>
                        </div>
                        <div className="aspect-square bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4 border border-slate-700 group hover:border-purple-500/50 transition-colors opacity-50 grayscale">
                            <Zap className="text-blue-400 mb-2" size={32} fill="currentColor" />
                            <p className="text-xs text-center font-bold text-slate-400">Speed Demon</p>
                            <p className="text-[10px] text-slate-600 text-center mt-1">100 Reports/Day</p>
                        </div>
                         <div className="aspect-square bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4 border border-slate-700 group hover:border-purple-500/50 transition-colors opacity-50 grayscale">
                            <Target className="text-red-400 mb-2" size={32} />
                            <p className="text-xs text-center font-bold text-slate-400">Eagle Eye</p>
                            <p className="text-[10px] text-slate-600 text-center mt-1">Perfect Accuracy</p>
                        </div>
                        <div className="aspect-square bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4 border border-slate-700 group hover:border-purple-500/50 transition-colors opacity-50 grayscale">
                            <Award className="text-green-400 mb-2" size={32} />
                            <p className="text-xs text-center font-bold text-slate-400">Veteran</p>
                            <p className="text-[10px] text-slate-600 text-center mt-1">1 Year Service</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
