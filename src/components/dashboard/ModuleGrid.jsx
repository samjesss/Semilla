import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { BookOpen, Award } from 'lucide-react';
import useProgressStore from '../../store/useProgressStore';

/**
 * Grid de Módulos Educativos. Muestra tarjetas con niveles, progreso
 * y badges obtenidos por el usuario.
 */
export default function ModuleGrid({ modules = [], title = "Módulos Educativos" }) {
  const navigate = useNavigate();
  const { completedModules, getModuleProgress } = useProgressStore();

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm md:text-lg font-black text-ink tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary-600" />
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {modules.map((modulo) => {
          const progress = getModuleProgress(modulo.id, modulo.lecciones);
          const isCompleted = completedModules.includes(modulo.id);

          return (
            <Card
              key={modulo.id}
              hoverEffect
              onClick={() => navigate(`/modulos/${modulo.id}`)}
              className="p-4 md:p-5 border border-slate-100 flex flex-col justify-between min-h-32 md:h-48 overflow-hidden relative"
            >
              {/* Vibe color overlay */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: modulo.color }}
              />

              <div className="space-y-2">
                {/* Nivel y Duración */}
                <div className="flex justify-between items-center">
                  <Badge variant="neutral" className="text-[10px] uppercase font-bold tracking-wider">
                    {modulo.nivel}
                  </Badge>
                  <span className="text-[10px] md:text-xs text-slate-400 font-semibold">
                    ⏱️ {modulo.duracion}
                  </span>
                </div>

                {/* Título */}
                <div className="flex gap-3 items-start">
                  <span className="text-2xl md:text-3xl select-none" role="img" aria-label={modulo.titulo}>
                    {modulo.emoji}
                  </span>
                  <div>
                    <h4 className="font-black text-ink text-sm md:text-base leading-snug line-clamp-1">
                      {modulo.titulo}
                    </h4>
                    <p className="hidden sm:block text-slate-500 text-[11px] md:text-xs leading-normal line-clamp-2 mt-0.5">
                      {modulo.subtitulo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progreso en el Módulo */}
              <div className="space-y-2 pt-2 border-t border-slate-50">
                {isCompleted ? (
                  <div className="flex items-center gap-1.5 text-xs text-primary-600 font-bold">
                    <Award className="w-4 h-4" />
                    <span>¡Módulo Completado! {modulo.badge?.emoji}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>Progreso</span>
                      <span>{progress}%</span>
                    </div>
                    <ProgressBar progress={progress} color="primary" height="h-1.5" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
