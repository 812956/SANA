import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SantaLayout } from './layouts/SantaLayout';
import { ElfLayout } from './layouts/ElfLayout';
import { InteractiveMap } from './pages/InteractiveMap';
import { FactoryFloor } from './pages/FactoryFloor';
import { ChildDatabase } from './pages/ChildDatabase';
import { ElfDatabase } from './pages/ElfDatabase';
import { ElfChildDetail } from './pages/elf/ElfChildDetail';
import { ElfProfile } from './pages/elf/ElfProfile';
import { ElfLoginPage } from './pages/elf/ElfLoginPage';
import { ElfCreateChild } from './pages/elf/ElfCreateChild';

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
                 <Route index element={<Navigate to="children" replace />} />
                 <Route path="create-child" element={<ElfCreateChild />} />
                 <Route path="children" element={<ElfDatabase />} />
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
