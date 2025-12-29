
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Smile, Frown, SkipBack, Send, Camera } from 'lucide-react';
import { FestiveLoader } from '../../components/FestiveLoader';
import { useAlert } from '../../context/AlertContext';

export const ElfChildDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [child, setChild] = useState<any>(null);
    const [reportType, setReportType] = useState('NICE');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

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
                    location: child.location || "Unknown Location", // Simplification
                    lat: child.lat,
                    lng: child.lng
                })
            });

            if (res.ok) {
                // Refresh child data to see new score/history
                await fetchChild();
                setDescription('');
                showAlert({
                    title: 'REPORT SUBMITTED',
                    message: `Observation recorded for ${child.name}. Points have been awarded to your station.`,
                    type: 'success'
                });
            }
        } catch (e) {
            console.error(e);
            showAlert({
                title: 'SUBMISSION FAILED',
                message: 'Could not transmit report to North Pole mainframe. Please check your connection.',
                type: 'error'
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (!child) return <div className="h-full flex items-center justify-center">
        <FestiveLoader message="Loading child dossier..." />
    </div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <button onClick={() => navigate('/elf/children')} className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                <SkipBack size={16} className="mr-2" /> Back to List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Child Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center relative overflow-hidden">
                        <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white mb-4">
                            {child.name.charAt(0)}
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">{child.name}</h1>
                        <div className="flex items-center justify-center text-slate-400 text-sm mb-4">
                             <MapPin size={14} className="mr-1" /> {child.city}, {child.country}
                        </div>
                        
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-slate-900 border ${child.status === 'NICE' ? 'text-green-400 border-green-900' : child.status === 'NAUGHTY' ? 'text-red-400 border-red-900' : 'text-amber-400 border-amber-900'}`}>
                            {child.status}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-700">
                             <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Current Behavior Score</p>
                             <div className="text-5xl font-mono font-bold text-white tracking-tighter">
                                {child.behaviorScore}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Report Form */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Send size={20} className="text-red-400" />
                            Submit Observation Report
                        </h2>
                        
                        <form onSubmit={handleSubmitReport} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setReportType('NICE')}
                                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${reportType === 'NICE' ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                                >
                                    <Smile /> Nice Deed
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setReportType('NAUGHTY')}
                                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${reportType === 'NAUGHTY' ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                                >
                                    <Frown /> Naughty Deed
                                </button>
                            </div>

                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what you observed..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 h-32 resize-none"
                                required
                            />

                            <div className="flex justify-between items-center">
                                <button type="button" className="text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors">
                                    <Camera size={16} /> Attach Evidence (Optional)
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-xl shadow-lg shadow-red-900/20 transition-all disabled:opacity-50"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Report'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* History */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Report History</h3>
                        <div className="space-y-4">
                            {(child.reports && child.reports.length > 0) ? child.reports.map((report: any) => (
                                <div key={report.id} className="flex gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                    <div className={`mt-1 ${report.type === 'NICE' ? 'text-green-500' : 'text-red-500'}`}>
                                        {report.type === 'NICE' ? <Smile size={20} /> : <Frown size={20} />}
                                    </div>
                                    <div>
                                        <p className="text-slate-300 font-medium">{report.description}</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {new Date(report.timestamp).toLocaleString()} • Reported by Elf
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-slate-500 text-center py-4">No reports filed yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
