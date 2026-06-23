import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProgressStore from '../store/useProgressStore';
import { getModules } from '../data/modules';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ArrowLeft, Check, BookOpen, Calculator } from 'lucide-react';

/**
 * Pantalla que renderiza el contenido completo de una lección individual,
 * con soporte para listas, tablas explicativas y CTAs a simuladores.
 */
export default function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completeLesson, completedLessons } = useProgressStore();

  // Buscar la lección y su módulo correspondiente
  let moduloPadre = null;
  let leccion = null;
  let leccionIndex = -1;

  const allModules = getModules();
  for (const m of allModules) {
    const idx = m.lecciones.findIndex(l => l.id === id);
    if (idx !== -1) {
      moduloPadre = m;
      leccion = m.lecciones[idx];
      leccionIndex = idx;
      break;
    }
  }

  // Desplazar la pantalla hacia arriba cuando se carga una lección
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!leccion || !moduloPadre) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-slate-500">Lección no encontrada.</p>
        <Button onClick={() => navigate('/modulos')}>Regresar</Button>
      </div>
    );
  }

  const { contenido = {} } = leccion;
  const isRead = completedLessons.includes(leccion.id);

  // Marcar como leída y volver al módulo
  const handleMarkAsRead = () => {
    completeLesson(leccion.id);
    navigate(`/modulos/${moduloPadre.id}`);
  };

  // Ir a la calculadora sugerida
  const handleGoToCalculator = (calcId) => {
    completeLesson(leccion.id); // Guardamos progreso primero
    navigate('/calculadoras', { state: { activeTab: calcId } });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 space-y-6">
      
      {/* Botón de regreso */}
      <button
        onClick={() => navigate(`/modulos/${moduloPadre.id}`)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 font-semibold text-sm transition-colors py-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al Módulo
      </button>

      {/* Cuerpo del Contenido */}
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Título de la lección */}
        <div className="space-y-2 text-left">
          <span 
            className="text-[10px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-wider inline-block"
            style={{ backgroundColor: moduloPadre.color }}
          >
            {moduloPadre.titulo} • Lección {leccionIndex + 1}
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-ink tracking-tight leading-tight">
            {leccion.titulo}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <span>⏱️ Lectura: {leccion.duracion || '4 min'}</span>
            {isRead && <span className="text-primary-600 font-bold ml-2">✓ Ya leída</span>}
          </div>
        </div>

        {/* Bloque de Contenido */}
        <Card className="p-6 md:p-8 border border-slate-100 text-left space-y-6 bg-white">
          
          {/* Introducción */}
          {contenido.intro && (
            <p className="text-sm md:text-base text-slate-700 font-semibold leading-relaxed border-l-4 border-primary-700 pl-4 py-1.5 bg-primary-50/60 rounded-r-lg">
              {contenido.intro}
            </p>
          )}

          {/* Secciones dinámicas */}
          {contenido.secciones && contenido.secciones.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-3 pt-3 border-t border-slate-50 first:border-t-0 first:pt-0">
              <h3 className="font-black text-ink text-sm md:text-base tracking-tight flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary-700" />
                {sec.titulo}
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {sec.texto}
              </p>

              {/* Listados */}
              {sec.lista && (
                <ul className="space-y-2 pl-2">
                  {sec.lista.map((item, lIdx) => (
                    <li key={lIdx} className="flex gap-2 items-start text-xs md:text-sm text-slate-600 leading-normal">
                      <span className="text-primary-600 font-bold select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tablas Explicativas */}
              {sec.tabla && (
                <div className="overflow-x-auto border border-primary-100 rounded-lg shadow-sm mt-3">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                        <th className="p-3 font-bold">Categoría</th>
                        <th className="p-3 font-bold">Monto</th>
                        <th className="p-3 font-bold">Ejemplos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {sec.tabla.map((fila, fIdx) => (
                        <tr key={fIdx} className="hover:bg-primary-50/30">
                          <td className="p-3 font-bold text-ink">{fila.categoria}</td>
                          <td className="p-3 font-bold text-primary-600">{fila.monto}</td>
                          <td className="p-3 text-slate-500 italic">{fila.ejemplos}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {/* Conclusión */}
          {contenido.conclusion && (
            <div className="pt-4 border-t border-slate-100">
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic bg-surface p-4 rounded-lg border border-primary-100/50">
                <strong>En resumen:</strong> {contenido.conclusion}
              </p>
            </div>
          )}

          {/* CTA a Calculadora si existe */}
          {leccion.calculadora && (
            <div className="bg-primary-50 border border-primary-100 p-5 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex gap-3 items-start text-left">
                <Calculator className="w-8 h-8 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-ink text-sm">Prueba con tus propios datos</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    Usa nuestro simulador interactivo para ver cómo se aplican estos números a tu remesa mensual.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="font-bold gap-1 text-xs shadow-sm flex-shrink-0 w-full md:w-auto"
                onClick={() => handleGoToCalculator(leccion.calculadora)}
              >
                Abrir Calculadora
              </Button>
            </div>
          )}

        </Card>

        {/* Botones de Navegación inferior */}
        <div className="flex flex-col md:flex-row gap-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleMarkAsRead}
            className="font-bold py-3.5 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Marcar lección como leída
          </Button>
        </div>

      </div>

    </div>
  );
}
