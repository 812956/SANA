import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Mail, Calendar, Award, AlertTriangle, TrendingUp, UserMinus, UserPlus, Clock, CheckSquare } from 'lucide-react';

import type { Elf } from '../types';

export const SantaElfProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [elf, setElf] = useState<Elf | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchElf = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/elves/${id}`);
                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }
                const data = await res.json();
                setElf(data);
            } catch (e) {
                console.error("Failed to fetch elf", e);
                setElf(undefined);
            } finally {
                setIsLoading(false);
            }
        };
        fetchElf();
    }, [id]);

    const handlePromote = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/elves/${id}/promote`, { method: 'POST' });
            if (res.ok) {
                alert(`SUCCESS: ${elf?.name} has been promoted!`);
                // Refresh
                const updated = await res.json();
                setElf(prev => prev ? ({ ...prev, ...updated }) : prev);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleTerminate = async () => {
        if (confirm(`WARNING: Are you sure you want to TERMINATE ${elf?.name}? This action cannot be undone.`)) {
            try {
                const res = await fetch(`http://localhost:3001/api/elves/${id}/terminate`, { method: 'POST' });
                if (res.ok) {
                    alert(`${elf?.name} has been TERMINATED.`);
                    navigate('/elves');
                }
            } catch (e) { console.error(e); }
        }
    };

    if (isLoading) {
        return <div className="h-full flex items-center justify-center text-santa-gold animate-pulse">ACCESSING PERSONNEL RECORDS...</div>;
    }

    if (!elf) {
        return <div className="h-full flex flex-col items-center justify-center text-red-500">
            <AlertTriangle size={48} className="mb-4" />
            <h2 className="text-2xl font-bold">PERSONNEL NOT FOUND</h2>
            <button onClick={() => navigate('/elves')} className="mt-4 text-white underline">Return to Directory</button>
        </div>;
    }

    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto custom-scrollbar">
            {/* Header / Nav */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => navigate('/elves')}
                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <h1 className="text-sm font-mono text-gray-500 tracking-widest">PERSONNEL FILE // {elf.id}</h1>
                </div>
            </div>

            {/* Main Profile Card */}
            <div className="grid grid-cols-3 gap-8 mb-8">
                {/* ID Card */}
                <div className="col-span-1 glass-panel rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-santa-red via-santa-gold to-santa-green" />
                    
                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center text-6xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10 ring-1 ring-white/20 overflow-hidden">
                        {elf.avatarUrl?.startsWith('http') ? <img src={elf.avatarUrl} className="w-full h-full object-cover" /> : elf.avatarUrl || '🧝'}
                    </div>
                    
                    <h1 className="text-3xl font-santa text-white mb-2 tracking-wide">{elf.name}</h1>
                    <div className="px-4 py-1 bg-white/5 rounded-full text-xs font-bold text-santa-gold tracking-widest uppercase mb-6 border border-santa-gold/20 shadow-glow-gold">
                        {elf.level}
                    </div>

                    <div className="w-full space-y-4 text-left">
                        <div className="flex items-center gap-3 text-gray-300 text-sm p-4 rounded-xl bg-black/20 border border-white/5">
                            <Shield size={16} className="text-blue-400" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider opacity-50 font-orbitron">Department</p>
                                <p className="text-white font-mono">{elf.department}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300 text-sm p-4 rounded-xl bg-black/20 border border-white/5">
                            <Mail size={16} className="text-purple-400" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider opacity-50 font-orbitron">Secure Comms</p>
                                <p className="text-white font-mono">{elf.email}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3 text-gray-300 text-sm p-4 rounded-xl bg-black/20 border border-white/5">
                            <Calendar size={16} className="text-green-400" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider opacity-50 font-orbitron">Service Start</p>
                                <p className="text-white font-mono">{elf.joinedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats & Actions */}
                <div className="col-span-2 space-y-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-santa-midnight/50 border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                            <h3 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Performance Score</h3>
                            <div className="text-4xl font-bold text-santa-gold">{(elf.points || 0).toLocaleString()}</div>
                        </div>
                        


                         <div className="bg-santa-midnight/50 border border-white/10 p-6 rounded-xl">
                            <h3 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Badges</h3>
                            <div className="flex flex-wrap gap-2">
                                {(elf.badges || []).map((badge, i) => (
                                    <span key={i} className="text-[10px] bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 px-2 py-1 rounded" title={badge}>
                                        {badge}
                                    </span>
                                ))}
                                {(!elf.badges || elf.badges.length === 0) && <span className="text-gray-600 text-xs italic">No badges earned yet</span>}
                            </div>
                        </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-white font-santa text-xl mb-4 flex items-center gap-2">
                            <Shield size={20} className="text-blue-400" /> ADMINISTRATIVE ACTIONS
                        </h3>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handlePromote}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
                            >
                                <UserPlus size={18} /> PROMOTE UNIT
                            </button>
                            <button 
                                onClick={handleTerminate}
                                className="flex-1 bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white border border-red-800 hover:border-transparent py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                <UserMinus size={18} /> TERMINATE EMPLOYMENT
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-4 text-center">
                            * All administrative actions are logged to the Permanent Record. Use with discretion.
                        </p>
                    </div>
                </div>
            </div>

            {/* Work Logs */}
            <h2 className="text-2xl font-santa text-white mb-6 flex items-center gap-3">
                <Clock className="text-gray-400" /> SERVICE RECORD
            </h2>
            <div className="space-y-4">
                {elf.workLogs && elf.workLogs.length > 0 ? (
                    elf.workLogs.map((log) => (
                    <div key={log.id} className="bg-black/20 border border-white/5 p-4 rounded-lg flex items-center gap-4">
                        <div className={`p-3 rounded-full ${
                            log.pointsEarned > 0 ? 'bg-yellow-500/10 text-yellow-500' : 
                            log.pointsEarned < 0 ? 'bg-red-500/10 text-red-500' :
                            'bg-blue-500/10 text-blue-500'
                        }`}>
                            {log.pointsEarned > 0 ? <Award size={20} /> : log.pointsEarned < 0 ? <AlertTriangle size={20} /> : <CheckSquare size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <h4 className="font-bold text-white">{log.action}</h4>
                                <span className="text-xs text-gray-500 font-mono">{new Date(log.timestamp).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-gray-400">{log.description}</p>
                        </div>
                        <div className={`text-xs font-mono font-bold ${log.pointsEarned >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {log.pointsEarned > 0 ? '+' : ''}{log.pointsEarned} pts
                        </div>
                    </div>
                ))) : (
                    <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl text-gray-500">
                        No significant events recorded in current cycle.
                    </div>
                )}
            </div>
        </div>
    );
};
