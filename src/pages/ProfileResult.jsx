import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import useUserStore from '../store/useUserStore';

/**
 * Pantalla que revela y celebra el perfil financiero asignado al usuario.
 */
export default function ProfileResult() {
  const navigate = useNavigate();
  const { profile } = useUserStore();

  // Si no hay perfil, redirigir a Landing
  useEffect(() => {
    if (!profile) {
      navigate('/');
    }
  }, [profile, navigate]);

  if (!profile) return null;

  const stableNoise = (seed) => {
    const value = Math.sin(seed * 999) * 10000;
    return value - Math.floor(value);
  };

  // Generar 30 trocitos de confeti con propiedades estables.
  const confettiColors = ['#126947', '#2f6fcf', '#e7ad35', '#b85f43'];
  const confettiPieces = Array.from({ length: 30 }).map((_, i) => {
    const left = `${stableNoise(i + 1) * 100}%`;
    const delay = `${stableNoise(i + 30) * 3}s`;
    const duration = `${stableNoise(i + 60) * 2 + 2}s`; // entre 2s y 4s
    const color = confettiColors[i % confettiColors.length];
    const size = `${stableNoise(i + 90) * 8 + 6}px`; // entre 6px y 14px

    return (
      <div
        key={i}
        className="confetti-piece"
        style={{
          left,
          animationDelay: delay,
          animationDuration: duration,
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: stableNoise(i + 120) > 0.5 ? '50%' : '2px'
        }}
      />
    );
  });

  return (
    <div className="min-h-dvh semilla-canvas flex items-center justify-center px-4 py-6 overflow-x-hidden overflow-y-auto relative">
      {/* Contenedor de Confeti */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {confettiPieces}
      </div>

      <div className="max-w-xl w-full text-center space-y-8 animate-fade-in-up relative z-10">
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-primary-800 tracking-[0.18em] uppercase bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-md">
            Perfil listo
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-ink tracking-tight leading-tight pt-2">
            Tu punto de partida
          </h1>
        </div>

        {/* Tarjeta de Revelación del Perfil */}
        <Card className="p-6 md:p-8 space-y-5 relative overflow-hidden border-primary-100">
          {/* Fondo decorativo con color del perfil */}
          <div
            className="absolute -right-12 -top-12 w-36 h-36 rounded-full opacity-10 filter blur-2xl"
            style={{ backgroundColor: profile.color }}
          />

          {/* Emoji Gigante con Animación Bounce */}
          <div
            className="inline-flex w-24 h-24 rounded-lg items-center justify-center text-5xl shadow-paper bg-accent-50 border border-accent-100 animate-scale-bounce mx-auto"
            style={{ borderBottomColor: profile.color, borderBottomWidth: '4px' }}
          >
            {profile.emoji}
          </div>

          <div className="space-y-2">
            <h2
              className="text-3xl md:text-4xl font-black tracking-tight"
              style={{ color: profile.color }}
            >
              {profile.nombre}
            </h2>
            <p className="text-slate-500 font-semibold italic text-sm md:text-base px-2 md:px-4">
              "{profile.mensajePrincipal}"
            </p>
          </div>

          <div className="border-t border-primary-100 pt-5 text-left">
            <h3 className="font-extrabold text-ink text-sm mb-2">Cómo vamos a empezar</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {profile.descripcion}
            </p>
          </div>

          {/* Próximos pasos recomendados según el perfil */}
          <div className="bg-surface border border-primary-100 p-4 rounded-lg text-left space-y-2">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Prioridades sugeridas
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.prioridades.map((prioridad, index) => {
                const priorityLabels = {
                  abrir_cuenta: 'Abrir Cuenta o Billetera',
                  fondo_emergencia: 'Crear Fondo Emergencia',
                  presupuesto: 'Organizar Presupuesto',
                  certificado_deposito: 'Invertir en Depósito a Plazo',
                  billeteras_digitales: 'Usar Billeteras Digitales',
                  cooperativa: 'Unirse a Cooperativa',
                  diversificacion: 'Diversificar Ahorros',
                  microempresa: 'Financiar Negocio'
                };
                return (
                  <span
                    key={index}
                    className="text-xs font-bold text-ink bg-primary-50 border border-primary-100 px-3 py-1 rounded-md shadow-sm"
                  >
                    {index + 1}. {priorityLabels[prioridad] || prioridad}
                  </span>
                );
              })}
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div>
          <Button
            variant="primary"
            size="lg"
            className="w-full md:w-auto px-10 py-4 font-bold"
            onClick={() => navigate('/inicio')}
          >
            Entrar a mi guía
          </Button>
        </div>
      </div>
    </div>
  );
}
