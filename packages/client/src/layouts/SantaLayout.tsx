
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { EventConsole } from '../components/EventConsole';
import { useSantaSystem } from '../hooks/useSantaSystem';
import { SantaAI } from '../components/SantaAI';

export const SantaLayout = () => {
  const { events } = useSantaSystem();

  return (
    <div className="flex h-screen bg-santa-midnight font-sans text-white overflow-hidden selection:bg-santa-gold/30">
        <Sidebar />
        <main className="flex-1 relative flex flex-col h-full overflow-hidden">
             {/* Snowfall Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <div className="animate-snowfall text-white text-opacity-50 text-xs absolute top-0 left-[10%]">❄</div>
                <div className="animate-snowfall text-white text-opacity-50 text-sm absolute top-0 left-[20%] animation-delay-2000">❅</div>
                <div className="animate-snowfall text-white text-opacity-50 text-xs absolute top-0 left-[35%] animation-delay-4000">❆</div>
                <div className="animate-snowfall text-white text-opacity-50 text-xl absolute top-0 left-[50%] animation-delay-1000">*</div>
                <div className="animate-snowfall text-white text-opacity-50 text-xs absolute top-0 left-[65%] animation-delay-3000">❄</div>
                <div className="animate-snowfall text-white text-opacity-50 text-sm absolute top-0 left-[80%] animation-delay-5000">❅</div>
                <div className="animate-snowfall text-white text-opacity-50 text-xs absolute top-0 left-[90%] animation-delay-2000">❆</div>
            </div>
            
            <div className="relative z-10 w-full h-full flex flex-col">
                <Outlet />
            </div>

            {/* Global Event Console Overlay */}
            <EventConsole events={events} onEventClick={(e) => console.log(e)} />
            
            {/* AI Agent */}
            <SantaAI />
        </main>
      </div>
  );
};
