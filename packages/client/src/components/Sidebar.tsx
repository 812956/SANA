import { NavLink } from 'react-router-dom';
import { Map, Users, Factory, Rocket } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex items-center gap-3 p-3 rounded-lg transition-smooth border ${
        isActive 
          ? 'glass-card-gold text-santa-gold' 
          : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5 hover:border-white/10 hover:scale-[1.02]'
      }`
    }
  >
    <Icon size={20} />
    <span className="font-orbitron tracking-wider text-sm">{label}</span>
  </NavLink>
);

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-white/10 flex flex-col h-screen shrink-0 glass-panel shadow-glass-lg">
      <div className="p-6 border-b border-white/10 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-santa-red/10 to-transparent pointer-events-none" />
        
        <h1 className="text-2xl font-santa font-bold text-santa-red drop-shadow-[0_0_10px_rgba(212,36,38,0.3)] relative z-10">
            S.A.N.A
        </h1>
        <p className="text-[10px] text-santa-gold/80 tracking-[0.2em] mt-1 relative z-10 font-orbitron">
            North Pole OS v2.0.4
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2 relative z-10">
        <NavItem to="/" icon={Map} label="Global View" />
        <NavItem to="/database" icon={Users} label="Child Database" />
        <NavItem to="/elves" icon={Users} label="Elf List" />
        <NavItem to="/logistics" icon={Factory} label="Toy Factory" />
      </nav>

      <div className="p-4 border-t border-white/10 relative z-10">
        <div className="glass-card-green p-3 text-xs text-santa-green flex items-center gap-2">
            <Rocket size={16} className="animate-pulse-subtle" />
            <span className="font-orbitron">SLEIGH STATUS: <br/> PRE-FLIGHT CHECK</span>
        </div>
      </div>
    </aside>
  );
};
