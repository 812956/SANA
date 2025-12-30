import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Lock, User, Snowflake } from 'lucide-react';
import { SnowOverlay } from '../components/SnowOverlay';

export const SantaLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate network delay
        setTimeout(() => {
            if (email === 'santa@gmail.com' && password === '1234') {
                localStorage.setItem('santa_auth', 'true');
                navigate('/');
            } else {
                setError('Invalid Santa credentials. Ho Ho No!');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-santa-red flex items-center justify-center p-4 relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none opacity-20">
                <SnowOverlay />
             </div>
             
             {/* Decorative Background Circles */}
             <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-santa-gold/20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative z-10 shadow-2xl">
                <div className="flex justify-center mb-6">
                     <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/20 border-4 border-santa-gold">
                        <Gift className="text-santa-red w-12 h-12" />
                     </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-santa font-bold text-white mb-2 drop-shadow-md">SANTA LOGIN</h1>
                    <p className="text-white/80 font-medium tracking-widest text-sm font-orbitron">OFFICIAL ACCESS ONLY</p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500/50 text-white p-3 rounded-xl mb-6 text-sm text-center font-medium animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-white/70 text-sm font-bold mb-2 font-orbitron tracking-wide">EMAIL ADDRESS</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-santa-gold focus:bg-black/30 transition-all font-mono"
                                placeholder="santa@gmail.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white/70 text-sm font-bold mb-2 font-orbitron tracking-wide">PASSWORD</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-santa-gold focus:bg-black/30 transition-all font-mono"
                                placeholder="••••"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-santa-gold hover:bg-yellow-400 text-santa-red font-extrabold py-4 rounded-xl shadow-lg shadow-black/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed font-orbitron tracking-widest text-lg mt-4"
                    >
                        {loading ? 'VERIFYING...' : 'ENTER SANA SYSTEM'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] font-mono uppercase tracking-wider">
                        <Snowflake className="w-3 h-3" />
                        <span>Secure Connection to North Pole Database</span>
                        <Snowflake className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
