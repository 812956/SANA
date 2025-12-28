
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Smile, Frown, ArrowLeft, Send, FileText, Calendar, Activity, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ElfChildDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [child, setChild] = useState<any>(null);
    const [reportType, setReportType] = useState('NICE');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    
    // UI State for Gamification Feedback
    const [showReward, setShowReward] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);

    useEffect(() => {
        fetchChild();
    }, [id]);

    const fetchChild = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/elf/children/${id}`);
            const data = await res.json();
            setChild(data);
        } catch (e) {
            console.error(e);
        }
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ef4444', '#22c55e', '#ffffff']
        });
    };

    const handleSubmitReport = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const elfUser = JSON.parse(localStorage.getItem('elf_user') || '{}');

        try {
            const res = await fetch('http://localhost:3001/api/elf/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    elfId: elfUser.id,
                    childId: child.id,
                    type: reportType,
                    description,
                    location: child.location || "Unknown Location",
                    lat: child.lat,
                    lng: child.lng
                })
            });

            if (res.ok) {
                // Success visual feedback
                setShowReward(true);
                setPointsEarned(50); // Hardcoded visual, backend handles actual logic
                triggerConfetti();
                
                await fetchChild();
                setDescription('');
                
                // Hide reward after 3s
                setTimeout(() => setShowReward(false), 3000);
            }
        } catch (e) {
            console.error(e);
            alert("Mission Failed: Network Error");
        } finally {
            setSubmitting(false);
        }
    };

    if (!child) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto h-full overflow-y-auto custom-scrollbar">
            <button onClick={() => navigate('/elf/children')} className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors group">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Directory
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Child Dossier Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                        
                        <div className="w-32 h-32 bg-slate-900 rounded-full mx-auto flex items-center justify-center text-4xl font-black text-slate-400 mb-6 border-4 border-slate-700 shadow-inner relative">
                            {child.name.charAt(0)}
                            <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-slate-900 ${child.status === 'NICE' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-white mb-2">{child.name}</h1>
                        <div className="flex items-center justify-center text-slate-400 text-sm mb-6 bg-slate-900/50 inline-block px-4 py-2 rounded-full border border-slate-700/50">
                             <MapPin size={14} className="mr-1 text-red-500" /> {child.city}, {child.country}
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Status</p>
                                <div className={`font-bold ${child.status === 'NICE' ? 'text-green-400' : 'text-red-400'}`}>{child.status}</div>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Score</p>
                                <div className="font-mono font-bold text-white text-xl">{child.behaviorScore}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Interaction Area */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Reward Toast */}
                    {showReward && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-6 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-green-400">Report Filed Successfully!</h3>
                                <p className="text-slate-300">Great work, Elf! You earned <span className="text-white font-bold">+{pointsEarned} XP</span>.</p>
                            </div>
                        </div>
                    )}

                    {/* Report Form */}
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-4">
                            <FileText className="text-red-400" /> New Observation Entry
                        </h2>
                        
                        <form onSubmit={handleSubmitReport} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setReportType('NICE')}
                                    className={`relative overflow-hidden p-4 rounded-2xl border transition-all duration-300 ${reportType === 'NICE' ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                >
                                    <div className="flex flex-col items-center gap-2 relative z-10">
                                        <Smile size={32} />
                                        <span className="font-bold">Good Deed</span>
                                    </div>
                                    {reportType === 'NICE' && <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent"></div>}
                                </button>
                                
                                <button 
                                    type="button"
                                    onClick={() => setReportType('NAUGHTY')}
                                    className={`relative overflow-hidden p-4 rounded-2xl border transition-all duration-300 ${reportType === 'NAUGHTY' ? 'bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                >
                                    <div className="flex flex-col items-center gap-2 relative z-10">
                                        <Frown size={32} />
                                        <span className="font-bold">Naughty Deed</span>
                                    </div>
                                    {reportType === 'NAUGHTY' && <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent"></div>}
                                </button>
                            </div>

                            <div>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter detailed observation notes..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 h-32 resize-none transition-all"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50"
                            >
                                {submitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <Send size={18} /> Transmit Report to Santa
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Timeline */}
                    <div className="bg-slate-800/20 border border-slate-800 rounded-3xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Activity size={18} className="text-slate-400" /> Behavioral History
                        </h3>
                        
                        <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                            {(child.reports && child.reports.length > 0) ? child.reports.map((report: any) => (
                                <div key={report.id} className="relative pl-10">
                                    <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center bg-slate-800 z-10 ${report.type === 'NICE' ? 'text-green-500' : 'text-red-500'}`}>
                                        {report.type === 'NICE' ? <Smile size={14} /> : <Frown size={14} />}
                                    </div>
                                    
                                    <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${report.type === 'NICE' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {report.type}
                                            </span>
                                            <div className="flex items-center text-xs text-slate-500 gap-1">
                                                <Calendar size={10} />
                                                {new Date(report.timestamp).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">{report.description}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 pl-8 text-slate-500">
                                    No historical records found. Start observing!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
