
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Smile, Frown, SkipBack, Gift, Activity, Award } from 'lucide-react';
import { FestiveLoader } from '../components/FestiveLoader';

export const SantaChildProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [child, setChild] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChild();
    }, [id]);

    const fetchChild = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/children/${id}`);
            const data = await res.json();
            setChild(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (status: 'NICE' | 'NAUGHTY') => {
        try {
            const res = await fetch(`http://localhost:3001/api/children/${id}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchChild(); // Refresh
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (loading || !child) return (
        <div className="h-full flex items-center justify-center">
            <FestiveLoader message="Retrieving Child Dossier..." />
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto custom-scrollbar">
            <button 
                onClick={() => navigate('/santa/database')} 
                className="flex items-center text-white/50 hover:text-white mb-8 transition-colors group font-orbitron text-sm tracking-widest"
            >
                <SkipBack size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                RETURN TO DATABASE
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Identity Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-8 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                        
                        <div className="w-32 h-32 mx-auto rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            <span className="text-5xl font-santa text-santa-gold">{child.name.charAt(0)}</span>
                        </div>

                        <h1 className="text-3xl font-santa text-white mb-2">{child.name}</h1>
                        <div className="flex items-center justify-center text-white/60 text-sm mb-6 font-mono">
                             <MapPin size={14} className="mr-2 text-santa-red" /> 
                             {child.city}, {child.country}
                        </div>
                        
                        <div className="flex justify-center mb-8">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] border shadow-lg ${
                                child.status === 'NICE' 
                                    ? 'bg-santa-green/10 text-santa-green border-santa-green shadow-green-900/20' 
                                    : 'bg-santa-red/10 text-santa-red border-santa-red shadow-red-900/20'
                            }`}>
                                {child.status} COMPLIANCE
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                            <div className="text-center">
                                <div className="text-xs text-white/40 uppercase tracking-widest mb-1 font-orbitron">AGE</div>
                                <div className="text-2xl font-mono text-white">{child.age}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-white/40 uppercase tracking-widest mb-1 font-orbitron">SCORE</div>
                                <div className={`text-2xl font-mono font-bold ${child.behaviorScore > 50 ? 'text-santa-green' : 'text-santa-red'}`}>
                                    {child.behaviorScore}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-panel p-6 rounded-3xl">
                        <h3 className="text-xs font-bold text-santa-gold uppercase tracking-widest mb-4 font-orbitron">Override Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => handleUpdateStatus('NICE')}
                                className="p-4 rounded-xl border border-santa-green/30 bg-santa-green/5 hover:bg-santa-green/20 text-santa-green transition-all flex flex-col items-center gap-2"
                            >
                                <Smile size={24} />
                                <span className="text-xs font-bold tracking-wider">MARK NICE</span>
                            </button>
                            <button 
                                onClick={() => handleUpdateStatus('NAUGHTY')}
                                className="p-4 rounded-xl border border-santa-red/30 bg-santa-red/5 hover:bg-santa-red/20 text-santa-red transition-all flex flex-col items-center gap-2"
                            >
                                <Frown size={24} />
                                <span className="text-xs font-bold tracking-wider">MARK NAUGHTY</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Stats & History */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-santa-gold/10 flex items-center justify-center text-santa-gold">
                                <Gift size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest font-orbitron">Requested Gift</div>
                                <div className="text-white font-medium truncate max-w-[120px]">{child.wishlist || "None"}</div>
                            </div>
                        </div>
                        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Activity size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest font-orbitron">Activity Level</div>
                                <div className="text-white font-medium">High</div>
                            </div>
                        </div>
                        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <Award size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest font-orbitron">Achievements</div>
                                <div className="text-white font-medium">12 Badges</div>
                            </div>
                        </div>
                    </div>

                    {/* History Feed */}
                    <div className="glass-panel p-8 rounded-3xl h-[500px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-santa text-white">Behavioral History</h2>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                                    <span className="w-2 h-2 rounded-full bg-santa-green"></span> Nice
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                                    <span className="w-2 h-2 rounded-full bg-santa-red"></span> Naughty
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                            {(child.reports && child.reports.length > 0) ? child.reports.map((report: any) => (
                                <div key={report.id} className="group flex gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                                            report.type === 'NICE' 
                                                ? 'bg-santa-green/20 border-santa-green/50 text-santa-green' 
                                                : 'bg-santa-red/20 border-santa-red/50 text-santa-red'
                                        }`}>
                                            {report.type === 'NICE' ? <Smile size={20} /> : <Frown size={20} />}
                                        </div>
                                        <div className="h-full w-px bg-white/5 group-last:hidden"></div>
                                    </div>
                                    <div className="flex-1 pb-6 border-b border-white/5 group-last:border-0 group-last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs font-bold tracking-widest px-2 py-0.5 rounded ${
                                                report.type === 'NICE' ? 'bg-santa-green/10 text-santa-green' : 'bg-santa-red/10 text-santa-red'
                                            }`}>
                                                {report.type} DEED
                                            </span>
                                            <span className="text-xs text-white/40 font-mono">
                                                {new Date(report.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-white/80 leading-relaxed text-sm">{report.description}</p>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-white/30">
                                            <MapPin size={12} /> {report.locationName || child.city}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="h-full flex flex-col items-center justify-center text-white/30">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                        <Activity size={32} />
                                    </div>
                                    <p>No behavioral records found yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
