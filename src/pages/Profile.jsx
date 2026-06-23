import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { BADGES } from '../data/badges';
import { QUESTIONS } from '../data/questions';
import useUserStore from '../store/useUserStore';
import useProgressStore from '../store/useProgressStore';
import { User, Award, ListTodo, LogOut, ShieldAlert } from 'lucide-react';

/**
 * Pantalla de Perfil de Usuario. Muestra insignias ganadas,
 * resumen de respuestas del quiz y permite reiniciar los datos.
 */
export default function Profile() {
  const navigate = useNavigate();
  const { profile, answers, resetAll } = useUserStore();
  const { earnedBadges, resetProgress } = useProgressStore();

  if (!profile) return null;

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo tu historial? Perderás tus respuestas, perfil y todas las insignias ganadas.')) {
      resetAll();
      resetProgress();
      navigate('/');
    }
  };

  // Obtener lista completa de badges
  const listBadges = Object.values(BADGES);

  return (
    <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 space-y-6 text-left">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
          Mi Cuenta
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-ink tracking-tight mt-1 leading-tight flex items-center gap-2">
          <User className="w-6 h-6 text-primary-700" />
          Mi Perfil Semilla
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Columna Izquierda: Perfil y Reset */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 text-center border border-slate-100 relative overflow-hidden bg-white">
            <div 
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: profile.color }}
            />
            {/* Emoji grande */}
            <div 
              className="inline-flex w-20 h-20 rounded-lg items-center justify-center text-4xl shadow-md bg-accent-50 border border-accent-100 mx-auto"
              style={{ borderBottomColor: profile.color, borderBottomWidth: '3.5px' }}
            >
              {profile.emoji}
            </div>

            <div className="space-y-2 mt-4">
              <h3 className="text-xl font-black text-ink tracking-tight leading-none">
                {profile.nombre}
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Perfil Financiero
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed bg-surface p-3.5 rounded-lg border border-primary-100/50">
              {profile.descripcion}
            </p>
          </Card>

          {/* Tarjeta de Reinicio */}
          <Card className="p-5 border border-rose-100 bg-rose-50/20 space-y-3.5">
            <div className="flex gap-2 items-start text-xs text-rose-800">
              <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block">Zona de Peligro</strong>
                <p className="text-slate-500 leading-normal mt-0.5">
                  Si deseas volver a realizar el cuestionario de onboarding para cambiar tu perfil o quieres empezar de nuevo la academia.
                </p>
              </div>
            </div>
            <Button
              variant="danger"
              fullWidth
              size="sm"
              className="font-bold flex items-center justify-center gap-1.5 rounded-xl py-2.5"
              onClick={handleReset}
            >
              <LogOut className="w-4 h-4" />
              Reiniciar todos los datos
            </Button>
          </Card>
        </div>

        {/* Columna Derecha: Insignias y Respuestas */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Insignias Unlocked */}
          <Card className="p-6 border border-slate-100 bg-white space-y-4">
            <h3 className="text-base font-black text-ink tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-700" />
              Mis Insignias ({earnedBadges.length} de {listBadges.length})
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {listBadges.map((badge) => {
                const isUnlocked = earnedBadges.includes(badge.id);
                return (
                  <div 
                    key={badge.id} 
                    className={`flex flex-col items-center text-center p-3 rounded-lg border transition-all ${
                      isUnlocked 
                        ? 'border-slate-100 bg-slate-50/60 shadow-xs' 
                        : 'border-slate-50 bg-white/20 opacity-30 select-none'
                    }`}
                  >
                    <div className="text-3.5xl p-2 select-none">{badge.emoji}</div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight mt-2 block break-words w-full">
                      {badge.nombre}
                    </span>
                    {isUnlocked && (
                      <span className="text-[8px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full mt-1.5 uppercase tracking-wide">
                        Obtenido
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Resumen del Cuestionario */}
          <Card className="p-6 border border-slate-100 bg-white space-y-4">
            <h3 className="text-base font-black text-ink tracking-tight flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-primary-700" />
              Resumen de tu Situación
            </h3>

            <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-2">
              {QUESTIONS.map((q) => {
                const userAns = answers[q.id];
                if (!userAns) return null;

                // Buscar el texto de la respuesta del usuario
                const answerText = q.tipo === 'seleccion_multiple' ? (() => {
                  const arr = Array.isArray(userAns) ? userAns : [];
                  const matched = q.opciones.filter(o => arr.includes(o.id)).map(o => o.texto);
                  return matched.length > 0 ? matched.join(', ') : 'Ninguno';
                })() : (() => {
                  const opt = q.opciones.find(o => o.id === userAns);
                  return opt ? opt.texto : userAns;
                })();

                return (
                  <div key={q.id} className="py-3 flex flex-col md:flex-row justify-between md:items-start gap-1">
                    <div className="max-w-md text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pregunta {q.id}</span>
                      <p className="font-bold text-slate-700 text-xs md:text-sm">{q.pregunta}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary-700 bg-primary-50/80 px-3 py-1 rounded-xl self-start md:self-auto leading-normal">
                      {answerText}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
