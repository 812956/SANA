import { NavLink } from 'react-router-dom';
import { Map, Users, Factory, Rocket } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }: { isActive: boolean }) => 
      `flex items-center gap-3 p-3 rounded-lg transition-all ${
        isActive 
          ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/50' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <Icon size={20} />
    <span className="font-orbitron tracking-wider text-sm">{label}</span>
  </NavLink>
);

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-base-dark border-r border-cyber-blue/20 flex flex-col h-screen shrink-0 backdrop-blur-md bg-black/40">
      <div className="p-6 border-b border-cyber-blue/20">
        <h1 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-white">
            S.A.N.A
        </h1>
        <p className="text-[10px] text-cyber-blue/60 tracking-[0.2em] mt-1">OS v2.0.4</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem to="/" icon={Map} label="GLOBAL VIEW" />
        <NavItem to="/database" icon={Users} label="CHILD DATABASE" />
        <NavItem to="/elves" icon={Users} label="ELF DIRECTORY" />
        <NavItem to="/logistics" icon={Factory} label="FACTORY FLOOR" />
      </nav>

      <div className="p-4 border-t border-cyber-blue/20">
        <div className="bg-cyber-red/10 border border-cyber-red/30 rounded p-3 text-xs text-cyber-red flex items-center gap-2">
            <Rocket size={16} />
            <span>SLEIGH STATUS: <br/> PRE-FLIGHT CHECK</span>
        </div>
      </div>
    </aside>
  );
};
