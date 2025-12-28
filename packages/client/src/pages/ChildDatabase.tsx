import { User, MapPin, Clock } from 'lucide-react';

interface Child {
    id: string;
    name: string;
    age: number;
    status: 'NICE' | 'NAUGHTY';
    location: string;
    lastSeen: string;
    niceScore: number;
}

const MOCK_CHILDREN: Child[] = [
    { id: '1', name: 'Zoe Techson', age: 10, status: 'NICE', location: 'Seattle, WA', lastSeen: '2 mins ago', niceScore: 98 },
    { id: '2', name: 'Kevin McAllister', age: 8, status: 'NAUGHTY', location: 'Chicago, IL', lastSeen: '5 mins ago', niceScore: 12 },
    { id: '3', name: 'Timmy Turner', age: 10, status: 'NAUGHTY', location: 'Dimmsdale, CA', lastSeen: '10 mins ago', niceScore: 45 },
    { id: '4', name: 'Alice Wonderland', age: 7, status: 'NICE', location: 'Oxford, UK', lastSeen: '1 hour ago', niceScore: 92 },
    { id: '5', name: 'Charlie Bucket', age: 11, status: 'NICE', location: 'London, UK', lastSeen: '3 hours ago', niceScore: 99 },
];

export const ChildDatabase = () => {
    return (
        <div className="flex-1 bg-base-dark p-8 overflow-y-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-orbitron font-bold text-white mb-2">CHILD DATABASE</h1>
                    <p className="text-cyber-blue/60 tracking-wider text-sm">GLOBAL MONITORING INDEX</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-black/40 border border-cyber-blue/30 rounded-lg p-3 flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                         <span className="text-cyber-blue font-mono text-sm">DB ONLINE</span>
                    </div>
                </div>
            </header>

            <div className="bg-black/20 border border-cyber-blue/20 rounded-xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left">
                    <thead className="bg-cyber-blue/10 border-b border-cyber-blue/20">
                        <tr>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest">IDENTITY</th>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest">STATUS</th>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest">LOCATION</th>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest">LAST ACTIVITY</th>
                            <th className="p-4 font-orbitron text-cyber-blue text-sm tracking-widest text-right">SCORE</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-blue/10">
                        {MOCK_CHILDREN.map((child) => (
                            <tr key={child.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-cyber-blue/20 flex items-center justify-center text-cyber-blue">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-cyber-blue transition-colors">{child.name}</div>
                                            <div className="text-xs text-gray-500">{child.age} YEARS OLD</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest border ${
                                        child.status === 'NICE' 
                                            ? 'bg-cyber-green/10 text-cyber-green border-cyber-green/30' 
                                            : 'bg-cyber-red/10 text-cyber-red border-cyber-red/30'
                                    }`}>
                                        {child.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 font-mono text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-cyber-blue/50" />
                                        {child.location}
                                    </div>
                                </td>
                                <td className="p-4 text-gray-400 font-mono text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-cyber-blue/50" />
                                        {child.lastSeen}
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="font-mono text-lg font-bold text-white">{child.niceScore}</span>
                                    <span className="text-xs text-gray-600 ml-1">/100</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
