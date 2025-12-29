
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { SantaAI } from '../components/SantaAI';
import { SnowOverlay } from '../components/SnowOverlay';

export const SantaLayout = () => {

  return (
    <div className="flex h-screen bg-santa-midnight font-sans text-white overflow-hidden selection:bg-santa-gold/30">
        <Sidebar />
        <main className="flex-1 relative flex flex-col h-full overflow-hidden">
             {/* Snowfall Overlay */}
            <SnowOverlay />
            
            <div className="relative z-10 w-full h-full flex flex-col page-enter">
                <Outlet />
            </div>
            
            {/* AI Agent */}
            <SantaAI />
        </main>
      </div>
  );
};
