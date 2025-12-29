import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Save, Globe } from 'lucide-react';
import { FestiveModal } from '../../components/FestiveModal';

const CITIES: Record<string, { lat: number; lng: number }> = {
    'London, UK': { lat: 51.5074, lng: -0.1278 },
    'New York, USA': { lat: 40.7128, lng: -74.0060 },
    'Tokyo, Japan': { lat: 35.6762, lng: 139.6503 },
    'Paris, France': { lat: 48.8566, lng: 2.3522 },
    'Sydney, Australia': { lat: -33.8688, lng: 151.2093 },
    'Moscow, Russia': { lat: 55.7558, lng: 37.6173 },
    'Berlin, Germany': { lat: 52.5200, lng: 13.4050 },
    'Toronto, Canada': { lat: 43.6532, lng: -79.3832 },
    'Beijing, China': { lat: 39.9042, lng: 116.4074 },
    'Rio de Janeiro, Brazil': { lat: -22.9068, lng: -43.1729 },
    'Cairo, Egypt': { lat: 30.0444, lng: 31.2357 },
    'Mumbai, India': { lat: 19.0760, lng: 72.8777 },
};

export const ElfCreateChild = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '', 
        city: '',
        country: '',
        status: 'NICE'
    });
    const [loading, setLoading] = useState(false);

    const [modalState, setModalState] = useState<{isOpen: boolean, title: string, message: string, type: 'success' | 'error'}>({
        isOpen: false,
        title: '',
        message: '',
        type: 'success'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Basic Geocoding Logic
        const locationKey = `${formData.city}, ${formData.country}`;
        const coords = CITIES[locationKey] || CITIES['London, UK']; // Default to London if unknown to avoid NULL Island

        try {
             const payload = {
                ...formData,
                age: parseInt(formData.age),
                location: locationKey,
                lat: coords.lat,
                lng: coords.lng,
                behaviorScore: formData.status === 'NICE' ? 85 : 35, // Default scores
                wishlist: 'Pending Analysis'
            };

            const res = await fetch('http://localhost:3001/api/children', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setModalState({
                    isOpen: true,
                    title: 'REGISTRATION COMPLETE',
                    message: `Successfully registered ${formData.name} into the Global Child Database. Tracking is now active.`,
                    type: 'success'
                });
            } else {
                throw new Error('Database rejection');
            }
        } catch (error) {
            setModalState({
                isOpen: true,
                title: 'REGISTRATION FAILED',
                message: 'Could not connect to the mainframe. Please verify network encryption and try again.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
        if (modalState.type === 'success') {
            navigate('/elf/children');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-santa tracking-wide">
                <User className="text-santa-red" />
                REGISTER NEW CHILD
            </h1>

            <div className="glass-panel p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white/60 text-sm mb-2 font-orbitron">Full Name</label>
                            <input 
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-santa-gold outline-none transition-all placeholder-white/20"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g. Timmy Turner"
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 text-sm mb-2 font-orbitron">Age</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-santa-gold outline-none transition-all placeholder-white/20"
                                value={formData.age}
                                onChange={e => setFormData({...formData, age: e.target.value})}
                                placeholder="Age"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white/60 text-sm mb-2 font-orbitron">City</label>
                            <input 
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-santa-gold outline-none transition-all placeholder-white/20"
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                                placeholder="e.g. London"
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 text-sm mb-2 font-orbitron">Country</label>
                            <input 
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-santa-gold outline-none transition-all placeholder-white/20"
                                value={formData.country}
                                onChange={e => setFormData({...formData, country: e.target.value})}
                                placeholder="e.g. UK"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white/60 text-sm mb-2 font-orbitron">Initial Assessment</label>
                        <select 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-santa-gold outline-none transition-all appearance-none"
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="NICE">Nice (On Track)</option>
                            <option value="NAUGHTY">Naughty (Needs Observation)</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={() => navigate('/elf/children')}
                            className="px-6 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-santa-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-santa-red/20 font-orbitron tracking-wider transition-transform hover:scale-105"
                        >
                            <Save size={18} />
                            {loading ? 'STORING...' : 'REGISTER'}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="mt-6 bg-santa-green/10 border border-santa-green/20 p-4 rounded-xl flex items-start gap-3">
                <Globe className="text-santa-green shrink-0 mt-1" size={20} />
                <div className="text-sm text-santa-green/80">
                    <p className="font-bold text-santa-green mb-1 font-orbitron">GEOSPATIAL SYNC ACTIVE</p>
                    <p>System will automatically assign coordinates based on City/Country. If exact location is unknown, child will be mapped to nearest regional hub.</p>
                </div>
            </div>

            <FestiveModal 
                isOpen={modalState.isOpen} 
                onClose={handleModalClose}
                title={modalState.title}
                footer={
                    <button 
                        onClick={handleModalClose}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-colors ${modalState.type === 'success' ? 'bg-santa-green hover:bg-green-600' : 'bg-santa-red hover:bg-red-600'}`}
                    >
                        ACKNOWLEDGE
                    </button>
                }
            >
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${modalState.type === 'success' ? 'bg-santa-green/20 text-santa-green' : 'bg-santa-red/20 text-santa-red'}`}>
                        {modalState.type === 'success' ? <User size={24} /> : <Globe size={24} />}
                    </div>
                    <div>
                        <p className="text-lg">{modalState.message}</p>
                    </div>
                </div>
            </FestiveModal>
        </div>
    );
};
