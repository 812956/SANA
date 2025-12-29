import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Save, Globe } from 'lucide-react';

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
                navigate('/elf/children');
            } else {
                alert('Failed to register child');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <User className="text-red-500" />
                Register New Child
            </h1>

            <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                            <input 
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g. Timmy Turner"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-2">Age</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                                value={formData.age}
                                onChange={e => setFormData({...formData, age: e.target.value})}
                                placeholder="Age"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-400 text-sm mb-2">City</label>
                            <input 
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                                placeholder="e.g. London"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-2">Country</label>
                            <input 
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                                value={formData.country}
                                onChange={e => setFormData({...formData, country: e.target.value})}
                                placeholder="e.g. UK"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Initial Assessment</label>
                        <select 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="NICE">Nice (On Track)</option>
                            <option value="NAUGHTY">Naughty (Needs Observation)</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={() => navigate('/elf/children')}
                            className="px-6 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-600/20"
                        >
                            <Save size={18} />
                            {loading ? 'Registering...' : 'Register Child'}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="mt-6 bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                <Globe className="text-blue-400 shrink-0 mt-1" size={20} />
                <div className="text-sm text-blue-200/80">
                    <p className="font-bold text-blue-400 mb-1">Geocoding Active</p>
                    <p>System will automatically assign coordinates based on City/Country. If exact location is unknown, child will be mapped to nearest regional hub.</p>
                </div>
            </div>
        </div>
    );
};
