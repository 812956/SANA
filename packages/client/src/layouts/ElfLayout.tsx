

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Gift, User, LogOut, UserPlus } from 'lucide-react';
import { SnowOverlay } from '../components/SnowOverlay';

export const ElfLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-santa-midnight font-sans text-white overflow-hidden selection:bg-santa-gold/30">
        {/* Festive Sidebar */}
        <aside className="w-64 glass-panel border-r border-white/10 flex flex-col relative z-20 shadow-glass-lg">
             <div className="p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-santa-red rounded-lg flex items-center justify-center shadow-glow-red">
                    <Gift className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="font-santa font-bold text-xl text-santa-gold tracking-wide">ELF PORTAL</h1>
                    <p className="text-[10px] text-white/50 font-orbitron tracking-wider">SECURE ACCESS</p>
                </div>
             </div>

             <nav className="flex-1 p-4 space-y-2">
                <NavLink to="/elf/children" className={({isActive}: {isActive: boolean}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth ${isActive ? 'glass-card-green' : 'text-white/60 hover:bg-white/5 hover:text-white hover:scale-[1.02]'}`}>
                    <User size={20} />
                    <span className="font-medium font-orbitron text-sm">Children List</span>
                </NavLink>
                <NavLink to="/elf/create-child" className={({isActive}: {isActive: boolean}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth ${isActive ? 'glass-card-gold' : 'text-white/60 hover:bg-white/5 hover:text-white hover:scale-[1.02]'}`}>
                    <UserPlus size={20} />
                    <span className="font-medium font-orbitron text-sm">Create Child</span>
                </NavLink>
                <NavLink to="/elf/profile" className={({isActive}: {isActive: boolean}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth ${isActive ? 'glass-card-red' : 'text-white/60 hover:bg-white/5 hover:text-white hover:scale-[1.02]'}`}>
                    <User size={20} />
                    <span className="font-medium font-orbitron text-sm">My Profile</span>
                </NavLink>
             </nav>

             <div className="p-4 border-t border-white/10">
                <button onClick={() => navigate('/elf/login')} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/60 hover:bg-santa-red/20 hover:text-santa-red transition-smooth border border-transparent hover:border-santa-red/30 hover:shadow-glow-red group">
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium font-orbitron text-sm">LOGOUT</span>
                </button>
             </div>
        </aside>

        {/* content */}
        <main className="flex-1 relative flex flex-col h-full overflow-hidden">
             {/* Snowfall Overlay */}
             <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <SnowOverlay />
             </div>
             
             <div className="relative z-10 w-full h-full overflow-y-auto page-enter">
                <Outlet />
             </div>
        </main>
      </div>
  );
};
