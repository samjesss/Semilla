import { useEffect, useMemo, useState } from 'react';
import Button from './ui/Button';
import { X } from 'lucide-react';

export default function TourGuide({ isOpen, onFinish }) {
  const steps = useMemo(() => [
    {
      target: '[data-tour="primary-action"]',
      title: 'Empieza aquí',
      body: 'Este bloque te dice qué hacer primero con tu dinero sobrante.',
    },
    {
      target: '[data-tour="tools-link"]',
      title: 'Usa herramientas',
      body: 'Aquí puedes calcular presupuesto, deudas y fondo de emergencia.',
    },
    {
      target: '[data-tour="learn-link"]',
      title: 'Aprende sin saturarte',
      body: 'Las lecciones quedan aparte para cuando necesites entender un concepto.',
    },
    {
      target: '[data-tour="profile-card"]',
      title: 'Tu perfil',
      body: 'Desde aquí puedes ver tu resumen o reiniciar el diagnóstico.',
    },
  ], []);

  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isOpen || !step) return undefined;

    const updatePosition = () => {
      const element = Array.from(document.querySelectorAll(step.target)).find((candidate) => {
        const candidateRect = candidate.getBoundingClientRect();
        return candidateRect.width > 0 && candidateRect.height > 0;
      });
      if (!element) {
        setRect(null);
        return;
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      window.setTimeout(() => {
        const nextRect = element.getBoundingClientRect();
        setRect({
          top: nextRect.top,
          left: nextRect.left,
          width: nextRect.width,
          height: nextRect.height,
        });
      }, 220);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const finish = () => {
    setStepIndex(0);
    onFinish();
  };

  const goNext = () => {
    if (stepIndex >= steps.length - 1) {
      finish();
      return;
    }
    setStepIndex(prev => prev + 1);
  };

  const cardPosition = rect && rect.top > window.innerHeight * 0.45 ? 'top-6' : 'bottom-6';

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-slate-950/55" />

      {rect && (
        <div
          className="absolute rounded-lg border-2 border-accent-500 bg-accent-500/10 shadow-[0_0_0_9999px_rgba(23,35,31,0.62),0_0_0_8px_rgba(18,105,71,0.22)] transition-all duration-300"
          style={{
            top: rect.top - 8,
            left: rect.left - 8,
            width: rect.width + 16,
            height: rect.height + 16,
          }}
        />
      )}

      <div className={`absolute left-4 right-4 md:left-auto md:right-8 md:w-80 ${cardPosition} pointer-events-auto`}>
        <div className="rounded-lg border border-accent-500/20 bg-ink text-white shadow-2xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-accent-500 font-black">
                Paso {stepIndex + 1} de {steps.length}
              </span>
              <h2 className="text-lg font-black mt-1">{step.title}</h2>
            </div>
            <button
              type="button"
              onClick={finish}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
              aria-label="Cerrar guía"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed mt-2">
            {step.body}
          </p>

          <div className="flex items-center justify-between gap-3 mt-4">
            <button
              type="button"
              onClick={finish}
              className="text-xs font-bold text-slate-300 hover:text-white"
            >
              Saltar
            </button>
            <Button
              variant="primary"
              size="sm"
              className="rounded-lg px-4 py-2 text-xs"
              onClick={goNext}
            >
              {stepIndex >= steps.length - 1 ? 'Listo' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
