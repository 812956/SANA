import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SantaLayout } from './layouts/SantaLayout';
import { ElfLayout } from './layouts/ElfLayout';
import { InteractiveMap } from './pages/InteractiveMap';
import { FactoryFloor } from './pages/FactoryFloor';
import { ChildDatabase } from './pages/ChildDatabase';
import { ElfDashboard } from './pages/elf/ElfDashboard';
import { ElfChildDirectory } from './pages/elf/ElfChildDirectory'; // UPDATED
import { ElfChildDetail } from './pages/elf/ElfChildDetail';
import { ElfProfile } from './pages/elf/ElfProfile';
import { ElfLoginPage } from './pages/elf/ElfLoginPage';

function App() {
  return (
    <Router>
        <Routes>
            {/* Santa Application Routes */}
            <Route path="/" element={<SantaLayout />}>
                <Route index element={<InteractiveMap />} />
                <Route path="database" element={<ChildDatabase />} />
                <Route path="logistics" element={<FactoryFloor />} />
            </Route>

            {/* Elf Dashboard Routes */}
            <Route path="/elf" element={<ElfLayout />}>
                 <Route index element={<Navigate to="dashboard" replace />} />
                 <Route path="dashboard" element={<ElfDashboard />} />
                 <Route path="children" element={<ElfChildDirectory />} /> {/* UPDATED */}
                 <Route path="children/:id" element={<ElfChildDetail />} />
                 <Route path="profile" element={<ElfProfile />} />
            </Route>
             <Route path="/elf/login" element={<ElfLoginPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  );
}

export default App;
