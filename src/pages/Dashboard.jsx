import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import QuickStats from '../components/dashboard/QuickStats';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import ModuleGrid from '../components/dashboard/ModuleGrid';
import Card from '../components/ui/Card';
import TourGuide from '../components/TourGuide';
import { getModules } from '../data/modules';
import { AlertCircle, ArrowRight, Compass, Map } from 'lucide-react';

/**
 * Pantalla de Dashboard Principal.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const {
    profile,
    recommendations,
    hasSeenTour,
    completeTour,
    resetTour,
    isOnboardingComplete
  } = useUserStore();

  // Redirigir al landing si no se ha completado el onboarding
  useEffect(() => {
    if (!isOnboardingComplete()) {
      navigate('/');
    }
  }, [isOnboardingComplete, navigate]);

  if (!profile) return null;

  const allModules = getModules();

  // Filtrar módulos sugeridos para el perfil
  const suggestedModules = allModules.filter(m => m.perfiles.includes(profile.id));
  const learningModules = suggestedModules.length > 0 ? suggestedModules.slice(0, 2) : allModules.slice(0, 2);
  const primaryRecommendation = recommendations[0];
  const secondaryRecommendations = recommendations.slice(1, 3);

  return (
    <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 space-y-4 md:space-y-6">
      <TourGuide isOpen={!hasSeenTour} onFinish={completeTour} />
      
      {/* ─── ENCABEZADO Y PERFIL ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
            Guía práctica Semilla
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-ink tracking-tight mt-1 leading-tight">
            Empecemos por lo más importante
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetTour}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-100 bg-white text-xs font-extrabold text-ink hover:text-primary-700 hover:border-primary-200 shadow-sm"
          >
            <Map className="w-4 h-4" />
            Ver guía
          </button>

          {/* Mini Card de Perfil */}
          <div
            data-tour="profile-card"
            onClick={() => navigate('/perfil')}
            className="flex items-center gap-3 bg-white border border-primary-100/60 p-2 pr-3 rounded-lg shadow-paper cursor-pointer hover:border-primary-200 transition-shadow active:scale-95"
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-inner bg-accent-50 border border-accent-100"
              style={{ borderBottomColor: profile.color, borderBottomWidth: '3px' }}
            >
              {profile.emoji}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Perfil</p>
              <p className="text-xs font-black text-ink mt-1 leading-none" style={{ color: profile.color }}>
                {profile.nombre}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RECOMENDACIONES PRIORIZADAS ─── */}
      <section data-tour="primary-action" className="semilla-rail space-y-3 md:space-y-5 pt-2 md:pt-4 ml-3 md:ml-0">
        <h3 className="text-base md:text-2xl font-black text-ink tracking-tight flex items-center gap-2">
          <Compass className="w-6 h-6 text-primary-700" />
          Tu siguiente paso
        </h3>
        
        {primaryRecommendation ? (
          <div className="space-y-3.5">
            <RecommendationCard
              recommendation={primaryRecommendation}
              defaultExpanded
              maxSteps={2}
              emphasis
            />

            {secondaryRecommendations.length > 0 && (
              <Card className="p-3 md:p-4 border border-primary-100/50 bg-white space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Después de eso</p>
                    <p className="hidden sm:block text-sm text-slate-600 mt-0.5">Estas ideas quedan como siguientes opciones, no como tareas urgentes.</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary-700 flex-shrink-0" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {secondaryRecommendations.map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => rec.link_calculadora
                        ? navigate('/calculadoras', { state: { activeTab: rec.link_calculadora } })
                        : navigate(`/modulos/${rec.modulo_sugerido}`)}
                      className="text-left p-3 rounded-lg bg-surface hover:bg-primary-50 border border-primary-100/40 hover:border-primary-200 transition-colors"
                    >
                      <span className="text-lg mr-2">{rec.icono}</span>
                      <span className="text-xs font-bold text-ink">{rec.titulo}</span>
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
        ) : (
          <Card className="p-6 text-center border border-slate-100 text-slate-500 text-sm">
            No hay recomendaciones pendientes. ¡Buen trabajo!
          </Card>
        )}
      </section>

      {/* ─── QUICK STATS (Métricas Rápidas) ─── */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Tu foto rápida
        </h3>
        <QuickStats />
      </section>

      {/* ─── MÓDULOS DE APRENDIZAJE ─── */}
      <div className="pt-4">
        <ModuleGrid modules={learningModules} title="Aprende solo lo necesario" />
      </div>

      {/* ─── LEGAL DISCLAIMER ─── */}
      <footer className="pt-4 md:pt-6 border-t border-slate-100 text-center">
        <details className="inline-block max-w-2xl text-left text-xs md:text-sm">
          <summary className="cursor-pointer list-none inline-flex gap-2 items-center bg-amber-50 border border-amber-100 text-amber-800 px-3 py-2 rounded-lg font-bold">
            <AlertCircle className="w-4 h-4 text-accent-600" />
            Aviso educativo
          </summary>
          <div className="mt-2 inline-flex gap-2 items-start bg-accent-50 border border-accent-100 text-accent-700 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-accent-600 mt-0.5" />
          <div>
            <p className="font-bold">Aviso Importante:</p>
            <p className="mt-1 leading-normal text-slate-600">
              Esta herramienta es meramente educativa y de simulación. No constituye asesoría financiera profesional autorizada. 
              Las tasas de interés, cobros y plazos son de referencia y pueden variar en cualquier momento. 
              Valida las condiciones vigentes directamente con tu banco, cooperativa o billetera móvil antes de realizar cualquier contratación.
            </p>
          </div>
          </div>
        </details>
      </footer>

    </div>
  );
}
