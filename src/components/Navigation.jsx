import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Calculator, 
  LogOut
} from 'lucide-react';
import useUserStore from '../store/useUserStore';

/**
 * Componentes de Navegación unificados (Sidebar para Desktop y BottomNav para Mobile).
 */
export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const resetAll = useUserStore(state => state.resetAll);

  // No mostrar la barra de navegación en Landing o en Onboarding/Quiz
  const hiddenRoutes = ['/', '/quiz', '/mi-perfil'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const navItems = [
    { name: 'Inicio', path: '/inicio', icon: Home, activePaths: ['/inicio'] },
    { name: 'Herramientas', path: '/calculadoras', icon: Calculator, activePaths: ['/calculadoras'], tour: 'tools-link' },
    { name: 'Aprender', path: '/modulos', icon: BookOpen, activePaths: ['/modulos', '/leccion', '/glosario'], tour: 'learn-link' },
  ];

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas reiniciar todo tu progreso en Semilla? Se borrarán tus perfiles y logros.')) {
      resetAll();
      navigate('/');
    }
  };

  return (
    <>
      {/* ─── BARRA LATERAL (SIDEBAR) PARA DESKTOP ─── */}
      <aside className="hidden md:flex flex-col w-64 bg-ink border-r border-primary-800 min-h-screen fixed left-0 top-0 p-5 z-20 text-white">
        {/* Logo de Semilla */}
        <div className="flex items-center gap-3 px-3 py-4 mb-8">
          <div className="w-10 h-10 rounded-lg bg-accent-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-black/20">
            🌱
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">SEMILLA</h1>
            <span className="text-[10px] font-bold text-accent-500 tracking-widest uppercase">Nicaragua</span>
          </div>
        </div>

        {/* Links de Navegación */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                data-tour={item.tour}
                className={({ isActive }) => {
                  const isCurrent = isActive || item.activePaths.some(path => location.pathname.startsWith(path));
                  return `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isCurrent
                      ? 'bg-accent-500 text-ink shadow-sm' 
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`;
                }}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Botón de Reinicio */}
        <div className="border-t border-white/10 pt-4 mt-auto">
          <button
            onClick={handleReset}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Reiniciar Todo
          </button>
        </div>
      </aside>

      {/* Spacer para Desktop (para que las páginas no se traslapen con el Sidebar) */}
      <div className="hidden md:block w-64 flex-shrink-0" />

      {/* ─── BARRA DE NAVEGACIÓN MÓVIL (BOTTOM NAV) ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-primary-100 px-2 py-1 flex justify-around items-center z-30 shadow-lg shadow-slate-900/5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.activePaths.some(path => location.pathname.startsWith(path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              data-tour={item.tour}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-primary-700 scale-105 font-bold' 
                  : 'text-slate-500 hover:text-ink'
              }`}
            >
              <Icon className="w-5.5 h-5.5 stroke-[2.25]" />
              <span className="text-[10px] font-semibold">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
