import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Lock, User } from 'lucide-react';
import { SnowOverlay } from '../../components/SnowOverlay';

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
                throw new Error(data.error || 'Login failed');
            }

            const elf = await response.json();
            // In a real app, store token. Here we just store the user object/ID
            localStorage.setItem('elf_user', JSON.stringify(elf));
            
            navigate('/elf/children');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-santa-midnight flex items-center justify-center p-4 relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none opacity-20">
                <SnowOverlay />
             </div>

            <div className="w-full max-w-md glass-panel rounded-3xl p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="flex justify-center mb-8">
                     <div className="w-20 h-20 bg-gradient-to-br from-santa-red to-red-900 rounded-2xl flex items-center justify-center shadow-lg shadow-santa-red/20 rotate-3 border border-white/10">
                        <Gift className="text-white w-10 h-10" />
                     </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-santa font-bold text-white mb-2">ELF ACCESS</h1>
                    <p className="text-santa-gold/60 font-orbitron text-xs tracking-widest">SECURE NORTH POLE NETWORK</p>
                </div>

                {error && (
                    <div className="bg-santa-red/10 border border-santa-red/30 text-santa-red p-3 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-white/50 text-sm font-medium mb-2 font-orbitron">AGENT ID</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                            <input 
                                type="text" 
                                value={agentId}
                                onChange={(e) => setAgentId(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-santa-gold focus:ring-1 focus:ring-santa-gold transition-all font-mono"
                                placeholder="e.g. elf1"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white/50 text-sm font-medium mb-2 font-orbitron">PASSWORD</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-santa-gold focus:ring-1 focus:ring-santa-gold transition-all font-mono"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-santa-green hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed font-orbitron tracking-wide"
                    >
                        {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-white/30 text-[10px] font-mono">
                        UNAUTHORIZED ACCESS WILL BE REPORTED TO SANTA.
                    </p>
                </div>
            </div>
        </div>
    );
};
