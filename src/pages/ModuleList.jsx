import { useNavigate } from 'react-router-dom';
import { getModules } from '../data/modules';
import ModuleGrid from '../components/dashboard/ModuleGrid';
import Card from '../components/ui/Card';
import { BookMarked, BookOpen } from 'lucide-react';

/**
 * Pantalla que agrupa todos los Módulos de Aprendizaje disponibles.
 */
export default function ModuleList() {
  const navigate = useNavigate();
  const allModules = getModules();

  return (
    <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
          Academia Semilla
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-ink tracking-tight mt-1 leading-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-700" />
          Módulos Educativos
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-2">
          Empieza con pocos temas, bien explicados y conectados con herramientas prácticas.
        </p>
      </div>

      {/* Grid General */}
      <div className="space-y-6">
        <ModuleGrid modules={allModules} title="Temas listos para aprender" />

        <Card
          hoverEffect
          onClick={() => navigate('/glosario')}
          className="p-5 border border-slate-100 bg-white flex items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3 text-left">
            <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-ink text-sm md:text-base">Glosario sencillo</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                Consulta palabras como interés, inflación o liquidez cuando aparezcan en una lección.
              </p>
            </div>
          </div>
          <span className="text-primary-600 font-black text-lg">→</span>
        </Card>
      </div>
    </div>
  );
}
