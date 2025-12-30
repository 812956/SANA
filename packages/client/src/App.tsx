import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SantaLayout } from './layouts/SantaLayout';
import { ElfLayout } from './layouts/ElfLayout';
import { InteractiveMap } from './pages/InteractiveMap';
import { FactoryFloor } from './pages/FactoryFloor';
import { ChildDatabase } from './pages/ChildDatabase';
import { ElfDatabase } from './pages/ElfDatabase';
import { SantaElfDirectory } from './pages/SantaElfDirectory';
import { SantaChildProfile } from './pages/SantaChildProfile';
import { ElfChildDetail } from './pages/elf/ElfChildDetail';
import { ElfProfile } from './pages/elf/ElfProfile';
import { ElfLoginPage } from './pages/elf/ElfLoginPage';
import { ElfCreateChild } from './pages/elf/ElfCreateChild';
import { SantaElfProfile } from './pages/SantaElfProfile';
import { SantaCreateElf } from './pages/SantaCreateElf';
import { AlertProvider } from './context/AlertContext';
import { ProtectedElfRoute } from './components/ProtectedElfRoute';
import { ProtectedSantaRoute } from './components/ProtectedSantaRoute';
import { SantaLoginPage } from './pages/SantaLoginPage';

import { SantaAIProvider } from './context/SantaAIContext';

function App() {
  return (
    <Router>
      <AlertProvider>
        <SantaAIProvider>
          <Routes>
            <Route path="/login" element={<SantaLoginPage />} />

            {/* Santa Application Routes */}
            <Route path="/" element={
              <ProtectedSantaRoute>
                <SantaLayout />
              </ProtectedSantaRoute>
            }>
                <Route index element={<InteractiveMap />} />
                <Route path="database" element={<ChildDatabase />} />
                <Route path="children/:id" element={<SantaChildProfile />} />
                <Route path="logistics" element={<FactoryFloor />} />
                <Route path="elves" element={<SantaElfDirectory />} />
                <Route path="elves/create" element={<SantaCreateElf />} />
                <Route path="elves/:id" element={<SantaElfProfile />} />
            </Route>

            {/* Elf Dashboard Routes - Protected */}
            <Route path="/elf" element={<ProtectedElfRoute><ElfLayout /></ProtectedElfRoute>}>
                 <Route index element={<Navigate to="children" replace />} />
                 <Route path="create-child" element={<ElfCreateChild />} />
                 <Route path="children" element={<ElfDatabase />} />
                 <Route path="children/:id" element={<ElfChildDetail />} />
                 <Route path="profile" element={<ElfProfile />} />
            </Route>
             <Route path="/elf/login" element={<ElfLoginPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SantaAIProvider>
      </AlertProvider>
    </Router>
  );
}

export default App;
