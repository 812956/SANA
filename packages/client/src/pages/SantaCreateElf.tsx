import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Save, Shield, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAlert } from '../context/AlertContext';

const DEPARTMENTS = [
    'Toy Making',
    'Logistics',
    'Reindeer Care',
    'Sleigh Maintenance'
];

export const SantaCreateElf = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        name: '',
        agentId: '',
        password: '',
        department: 'Toy Making',
        avatarUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate agentId format (alphanumeric, no spaces)
            if (!/^[a-zA-Z0-9_-]+$/.test(formData.agentId)) {
                showAlert({
                    title: 'INVALID AGENT ID',
                    message: 'Agent ID must contain only letters, numbers, hyphens, and underscores.',
                    type: 'error'
                });
                setLoading(false);
                return;
            }

            // Validate password strength
            if (formData.password.length < 6) {
                showAlert({
                    title: 'WEAK PASSWORD',
                    message: 'Password must be at least 6 characters long.',
                    type: 'error'
                });
                setLoading(false);
                return;
            }

            const payload = {
                name: formData.name,
                agentId: formData.agentId,
                password: formData.password,
                department: formData.department,
                avatarUrl: formData.avatarUrl || undefined,
                badges: []
            };

            const res = await fetch('http://localhost:3001/api/elves', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                showAlert({
                    title: 'ELF RECRUITED SUCCESSFULLY',
                    message: `Welcome ${formData.name} to the North Pole team! Agent ID: ${formData.agentId}`,
                    type: 'success',
                    onAcknowledge: () => navigate('/elves')
                });
            } else {
                const error = await res.json();
                throw new Error(error.error || 'Failed to create elf');
            }
        } catch (error: any) {
            console.error(error);
            showAlert({
                title: 'RECRUITMENT FAILED',
                message: error.message.includes('Unique constraint') 
                    ? 'Agent ID already exists. Please choose a different ID.'
                    : 'Could not connect to the North Pole mainframe. Please try again.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col p-8 overflow-auto">
            <header className="mb-8 shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-santa text-white tracking-wider mb-2 flex items-center gap-3">
                            <UserPlus className="text-santa-gold" size={36} />
                            RECRUIT NEW ELF
                        </h1>
                        <p className="text-santa-gold/60 font-mono text-sm tracking-widest">
                            PERSONNEL ONBOARDING // NORTH POLE OPERATIONS
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto w-full">
                <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Sparkles size={120} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Name and Agent ID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm mb-2 font-orbitron font-bold">
                                    FULL NAME *
                                </label>
                                <input 
                                    required
                                    className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-santa-gold focus:ring-1 focus:ring-santa-gold outline-none transition-all placeholder-white/30"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g. Jingleberry Snowflake"
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm mb-2 font-orbitron font-bold">
                                    AGENT ID *
                                </label>
                                <input 
                                    required
                                    className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-santa-gold focus:ring-1 focus:ring-santa-gold outline-none transition-all placeholder-white/30 font-mono"
                                    value={formData.agentId}
                                    onChange={e => setFormData({...formData, agentId: e.target.value})}
                                    placeholder="e.g. ELF-2024-001"
                                />
                                <p className="text-xs text-white/40 mt-1 font-mono">
                                    Unique identifier (letters, numbers, -, _)
                                </p>
                            </div>
                        </div>

                        {/* Password and Department */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm mb-2 font-orbitron font-bold">
                                    PASSWORD *
                                </label>
                                <div className="relative">
                                    <input 
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full bg-black/40 border border-white/20 rounded-lg p-3 pr-12 text-white focus:border-santa-gold focus:ring-1 focus:ring-santa-gold outline-none transition-all placeholder-white/30 font-mono"
                                        value={formData.password}
                                        onChange={e => setFormData({...formData, password: e.target.value})}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-santa-gold transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-xs text-white/40 mt-1 font-mono">
                                    Minimum 6 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm mb-2 font-orbitron font-bold">
                                    DEPARTMENT *
                                </label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                                    <select 
                                        className="w-full bg-black/40 border border-white/20 rounded-lg p-3 pl-11 text-white focus:border-santa-gold focus:ring-1 focus:ring-santa-gold outline-none transition-all appearance-none cursor-pointer"
                                        value={formData.department}
                                        onChange={e => setFormData({...formData, department: e.target.value})}
                                    >
                                        {DEPARTMENTS.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Avatar URL (Optional) */}
                        <div>
                            <label className="block text-white/80 text-sm mb-2 font-orbitron font-bold">
                                AVATAR URL <span className="text-white/40 font-normal">(Optional)</span>
                            </label>
                            <input 
                                type="url"
                                className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-santa-gold focus:ring-1 focus:ring-santa-gold outline-none transition-all placeholder-white/30"
                                value={formData.avatarUrl}
                                onChange={e => setFormData({...formData, avatarUrl: e.target.value})}
                                placeholder="https://example.com/avatar.png"
                            />
                            <p className="text-xs text-white/40 mt-1 font-mono">
                                Leave blank for default avatar
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                            <button 
                                type="button" 
                                onClick={() => navigate('/elves')}
                                className="px-8 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-orbitron tracking-wider"
                            >
                                CANCEL
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="bg-gradient-to-r from-santa-gold to-yellow-600 hover:from-yellow-600 hover:to-santa-gold text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-santa-gold/30 font-orbitron tracking-wider transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <Save size={18} />
                                {loading ? 'RECRUITING...' : 'RECRUIT ELF'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Panel */}
                <div className="mt-6 bg-blue-500/10 border border-blue-400/20 p-4 rounded-xl flex items-start gap-3">
                    <Sparkles className="text-blue-400 shrink-0 mt-1" size={20} />
                    <div className="text-sm text-blue-300/80">
                        <p className="font-bold text-blue-300 mb-1 font-orbitron">RECRUITMENT PROTOCOL</p>
                        <p>New elves start at Level 1 (Junior Elf) with 0 points. They will earn points through reports and activities, unlocking promotions and badges as they progress.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
