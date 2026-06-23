import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

/**
 * Tarjeta de Recomendación Priorizada. Se expande para revelar pasos prácticos
 * y accesos a herramientas recomendadas.
 */
export default function RecommendationCard({ recommendation, defaultExpanded = false, maxSteps = null, emphasis = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const navigate = useNavigate();

  const {
    prioridad,
    icono,
    titulo,
    resumen,
    pasos = [],
    modulo_sugerido,
    link_calculadora
  } = recommendation;

  // Mapa de etiquetas de prioridad
  const getPriorityBadge = (p) => {
    if (p === 1) return <Badge variant="danger">Primero</Badge>;
    if (p === 2) return <Badge variant="accent">Luego</Badge>;
    return <Badge variant="primary">Opcional</Badge>;
  };

  const handleAction = () => {
    if (link_calculadora) {
      navigate('/calculadoras', { state: { activeTab: link_calculadora } });
    } else if (modulo_sugerido) {
      navigate(`/modulos/${modulo_sugerido}`);
    }
  };

  const visibleSteps = maxSteps ? pasos.slice(0, maxSteps) : pasos;
  const hiddenStepsCount = Math.max(0, pasos.length - visibleSteps.length);

  return (
    <Card 
      className={`p-4 md:p-5 transition-all duration-300 border ${
        isExpanded || emphasis ? 'border-primary-200 shadow-paper' : 'border-primary-100/40'
      }`}
    >
      <div 
        className="flex items-start gap-3 md:gap-4 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Icono Redondeado */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent-50 border border-accent-100 flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
          {icono}
        </div>

        {/* Textos y Badge */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            {getPriorityBadge(prioridad)}
          </div>
          <h3 className="font-black text-ink text-sm md:text-lg leading-snug">
            {titulo}
          </h3>
          <p className="hidden sm:block text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
            {resumen}
          </p>
        </div>

        {/* Indicador de Expansión */}
        <div className="text-slate-400 p-1 hover:text-primary-700 transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Panel Expandido */}
      {isExpanded && (
        <div className="mt-4 pt-3 md:mt-5 md:pt-4 border-t border-slate-100 space-y-3 md:space-y-4 animate-fade-in-up">
          {/* Pasos a seguir */}
          <div className="space-y-2.5 md:space-y-3">
            <h4 className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pasos prácticos:
            </h4>
            <ul className="space-y-2">
              {visibleSteps.map((paso, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-normal line-clamp-2 sm:line-clamp-none">{paso}</span>
                </li>
              ))}
            </ul>
            {hiddenStepsCount > 0 && (
              <p className="text-[11px] text-slate-400 font-semibold pl-7">
                {hiddenStepsCount} paso(s) más para después.
              </p>
            )}
          </div>

          {/* CTA de Herramientas */}
          <div className="flex justify-end gap-2 md:gap-3 pt-1 md:pt-2">
            {modulo_sugerido && (
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-xs font-semibold gap-1"
                onClick={() => navigate(`/modulos/${modulo_sugerido}`)}
              >
                Aprender en el Módulo
              </Button>
            )}
            
            {(link_calculadora || modulo_sugerido) && (
              <Button
                variant="primary"
                size="sm"
                className="text-xs font-bold gap-1 shadow-xs rounded-lg"
                onClick={handleAction}
              >
                {link_calculadora ? 'Usar Calculadora' : 'Ver Módulo'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
