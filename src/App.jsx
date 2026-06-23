import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';

// Importación de Páginas
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import ProfileResult from './pages/ProfileResult';
import Dashboard from './pages/Dashboard';
import ModuleList from './pages/ModuleList';
import ModuleDetail from './pages/ModuleDetail';
import LessonDetail from './pages/LessonDetail';
import Calculators from './pages/Calculators';
import Glossary from './pages/Glossary';
import Profile from './pages/Profile';

import './App.css';

/**
 * Componente Principal de la Aplicación. Configura el Enrutamiento
 * y el diseño responsive general (Sidebar/BottomNav).
 */
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row min-h-screen semilla-canvas semilla-page text-ink">
        
        {/* Navegación Responsive */}
        <Navigation />

        {/* Contenido Principal */}
        <main className="flex-1 w-full max-w-5xl mx-auto pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<Onboarding />} />
            <Route path="/mi-perfil" element={<ProfileResult />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/modulos" element={<ModuleList />} />
            <Route path="/modulos/:id" element={<ModuleDetail />} />
            <Route path="/leccion/:id" element={<LessonDetail />} />
            <Route path="/calculadoras" element={<Calculators />} />
            <Route path="/glosario" element={<Glossary />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
