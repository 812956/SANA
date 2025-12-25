import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { InteractiveMap } from './pages/InteractiveMap';
import { FactoryFloor } from './pages/FactoryFloor';
import { ChildDatabase } from './pages/ChildDatabase';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-base-dark font-sans text-white overflow-hidden selection:bg-cyber-blue/30">
        <Sidebar />
        <main className="flex-1 relative flex flex-col h-full overflow-hidden">
             {/* Global Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,22,28,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(18,22,28,0.8)_2px,transparent_2px)] bg-[size:40px_40px] border-cyber-blue/5 pointer-events-none z-0"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col">
                <Routes>
                  <Route path="/" element={<InteractiveMap />} />
                  <Route path="/database" element={<ChildDatabase />} />
                  <Route path="/logistics" element={<FactoryFloor />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
