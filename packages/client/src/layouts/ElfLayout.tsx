
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Gift, Map, User, LogOut, Bell } from 'lucide-react';

export const ElfLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-slate-900 font-sans text-slate-100 overflow-hidden selection:bg-red-500/30">
        {/* Festive Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col relative z-20">
             <div className="p-6 border-b border-slate-800/50 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <Gift className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-lg text-white tracking-wide">ELF DASH</h1>
                    <p className="text-xs text-slate-400">North Pole OS v9.0</p>
                </div>
             </div>

             <nav className="flex-1 p-4 space-y-2">
                <NavLink to="/elf/dashboard" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-red-600/10 text-red-500 border border-red-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                    <Bell size={20} />
                    <span className="font-medium">Dashboard</span>
                </NavLink>
                <NavLink to="/elf/children" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-green-600/10 text-green-500 border border-green-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                    <User size={20} />
                    <span className="font-medium">Children List</span>
                </NavLink>
                <NavLink to="/elf/profile" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-amber-600/10 text-amber-500 border border-amber-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                    <User size={20} />
                    <span className="font-medium">My Profile</span>
                </NavLink>
             </nav>

             <div className="p-4 border-t border-slate-800">
                <button onClick={() => navigate('/elf/login')} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-950/30 hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
             </div>
        </aside>

        {/* content */}
        <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-slate-900">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none"></div>
             <div className="relative z-10 w-full h-full overflow-y-auto">
                <Outlet />
             </div>
        </main>
      </div>
  );
};
