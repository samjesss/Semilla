import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import useUserStore from '../store/useUserStore';

/**
 * Pantalla de Landing de la aplicación Semilla.
 */
export default function Landing() {
  const navigate = useNavigate();
  const isOnboardingComplete = useUserStore((state) => state.isOnboardingComplete());

  // Redirigir directamente al Dashboard si ya se completó el onboarding
  useEffect(() => {
    if (isOnboardingComplete) {
      navigate('/inicio');
    }
  }, [isOnboardingComplete, navigate]);

  return (
    <div className="min-h-screen semilla-canvas flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-7 animate-fade-in-up">
        {/* Logotipo y Título */}
        <div className="space-y-3">
          <div className="inline-flex w-20 h-20 rounded-lg bg-accent-500 border border-accent-600 items-center justify-center text-4xl shadow-[0_6px_0_#8c5a10] animate-scale-bounce">
            🌱
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-ink tracking-tight leading-none">
            SEMILLA
          </h1>
          <p className="text-primary-700 font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase">
            Planta hoy, cosecha mañana
          </p>
        </div>

        {/* Tarjeta de Presentación */}
        <Card className="p-5 md:p-8 space-y-5 border-primary-100" variant="glass">
          <h2 className="text-2xl md:text-4xl font-black text-ink leading-tight">
            Recibí, separá, cuidá.
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Una guía sencilla para convertir el sobrante de tus remesas en decisiones pequeñas y constantes.
          </p>

          {/* Características clave */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 pt-2 text-left">
            <div className="p-3 bg-white/70 rounded-lg border border-primary-100">
              <span className="text-xl block mb-2">📋</span>
              <div>
                <h4 className="font-extrabold text-ink text-[11px] md:text-xs">Diagnóstico</h4>
                <p className="hidden sm:block text-[11px] text-slate-500">Pocas preguntas, una dirección clara.</p>
              </div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-primary-100">
              <span className="text-xl block mb-2">🧮</span>
              <div>
                <h4 className="font-extrabold text-ink text-[11px] md:text-xs">Herramientas</h4>
                <p className="hidden sm:block text-[11px] text-slate-500">Calculadoras listas para usar.</p>
              </div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-primary-100">
              <span className="text-xl block mb-2">📚</span>
              <div>
                <h4 className="font-extrabold text-ink text-[11px] md:text-xs">Aprendizaje</h4>
                <p className="hidden sm:block text-[11px] text-slate-500">Conceptos sin saturarte.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full md:w-auto px-10 py-4 font-bold text-base"
            onClick={() => navigate('/quiz')}
          >
            Empezar diagnóstico
          </Button>
          
          <div className="flex flex-col items-center gap-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              🔒 100% privado • Sin registros obligatorios • Los datos se guardan en tu celular
            </span>
            <span className="text-[10px] bg-slate-200/50 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
              Contexto Nicaragua • Año 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
