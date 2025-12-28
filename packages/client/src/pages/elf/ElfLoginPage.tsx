import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snowflake, Lock, User, Key, ShieldCheck } from 'lucide-react';

export const ElfLoginPage = () => {
    const navigate = useNavigate();
    const [agentId, setAgentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/elf/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agentId, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Access Denied');
            }

            const elf = await response.json();
            localStorage.setItem('elf_user', JSON.stringify(elf));
            
            // Artificial delay for "Biometric Scan" effect
            setTimeout(() => {
                navigate('/elf/dashboard');
            }, 800);
            
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black"></div>
             <div className="absolute top-0 left-0 right-0 h-[500px] bg-red-600/10 blur-[100px] rounded-full opacity-50"></div>
             
             {/* Animated Snow (CSS animation would be ideal here, using static for now) */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="w-full max-w-lg relative z-10">
                {/* Header Logo Area */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/50 mb-6 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <Snowflake className="text-white w-12 h-12 animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">North Pole <span className="text-red-500">OS</span></h1>
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-red-500/30 rounded-full">
                        <ShieldCheck size={14} className="text-red-400" />
                        <span className="text-xs font-bold text-red-300 uppercase tracking-widest">Restricted Access</span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-shake">
                            <ShieldCheck size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold ml-1">Agent Identification</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-400 transition-colors w-5 h-5" />
                                <input 
                                    type="text" 
                                    value={agentId}
                                    onChange={(e) => setAgentId(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:bg-slate-900 transition-all font-mono"
                                    placeholder="ELF-ID-XXXX"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold ml-1">Secure Passphrase</label>
                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-400 transition-colors w-5 h-5" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:bg-slate-900 transition-all font-mono"
                                    placeholder="••••••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <Lock className="animate-spin" size={18} /> Verifying Credentials...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} /> Authenticate
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center space-y-2">
                    <p className="text-slate-500 text-xs">
                        By logging in, you agree to the <span className="text-slate-400 hover:text-white cursor-pointer underline decoration-slate-700 underline-offset-4">North Pole Secrecy Act (NPSA-2024)</span>.
                    </p>
                    <p className="text-slate-600 text-[10px] bg-slate-900/50 inline-block px-3 py-1 rounded-full border border-slate-800">
                        System Version v42.0.1 • Server: NORTH-1
                    </p>
                </div>
            </div>
        </div>
    );
};
