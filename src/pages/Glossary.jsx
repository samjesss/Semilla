import { useState } from 'react';
import { GLOSSARY } from '../data/concepts';
import Card from '../components/ui/Card';
import { Search, ChevronDown, ChevronUp, BookMarked, Sparkles } from 'lucide-react';

/**
 * Pantalla de Glosario Financiero con filtros de búsqueda y tarjetas expandibles.
 */
export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTermId, setExpandedTermId] = useState(null);

  // Filtrar conceptos según el input
  const filteredGlossary = GLOSSARY.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      item.termino.toLowerCase().includes(query) ||
      item.definicion_simple.toLowerCase().includes(query)
    );
  });

  const toggleExpand = (id) => {
    setExpandedTermId(expandedTermId === id ? null : id);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 space-y-6 text-left">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
          Biblioteca de Conceptos
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-ink tracking-tight mt-1 leading-tight flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-primary-700" />
          Glosario Financiero
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-2">
          Aprende el significado de los términos financieros más comunes en Nicaragua con explicaciones sencillas y del día a día.
        </p>
      </div>

      {/* Barra de Búsqueda */}
      <div className="relative max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Busca un término (ej: interés compuesto)..."
          className="w-full pl-11 pr-4 py-3 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none transition-colors bg-white text-sm"
        />
      </div>

      {/* Listado de términos */}
      {filteredGlossary.length > 0 ? (
        <div className="space-y-3">
          {filteredGlossary.map((item) => {
            const isExpanded = expandedTermId === item.id;
            return (
              <Card
                key={item.id}
                className={`border p-4 transition-all duration-200 cursor-pointer ${
                  isExpanded ? 'border-primary-200 shadow-paper bg-white' : 'border-primary-100/40 bg-white hover:bg-primary-50/40'
                }`}
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex justify-between items-center select-none">
                  <h3 className="font-black text-ink text-sm md:text-base">
                    {item.termino}
                  </h3>
                  <div className="text-slate-400 hover:text-slate-600 transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Explicación expandida */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-50 space-y-4 animate-fade-in-up text-xs md:text-sm">
                    {/* Definición Simple */}
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">En palabras sencillas:</h4>
                      <p className="text-slate-600 leading-relaxed font-semibold">
                        {item.definicion_simple}
                      </p>
                    </div>

                    {/* Ejemplo práctico */}
                    {item.ejemplo && (
                      <div className="bg-slate-50/80 p-3 border border-slate-100/50 rounded-xl space-y-1">
                        <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ejemplo del día a día:</h4>
                        <p className="text-slate-600 leading-normal italic">
                          "{item.ejemplo}"
                        </p>
                      </div>
                    )}

                    {/* Definición Técnica */}
                    {item.definicion_tecnica && (
                      <div className="space-y-1 pt-1">
                        <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Definición técnica (por si quieres saber más):</h4>
                        <p className="text-slate-400 text-xs leading-normal">
                          {item.definicion_tecnica}
                        </p>
                      </div>
                    )}

                    {/* Ventajas / Desventajas extras */}
                    {(item.ventaja || item.desventaja) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        {item.ventaja && (
                          <div className="bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-xl text-xs text-slate-600">
                            <strong className="text-emerald-700">✓ Ventaja:</strong> {item.ventaja}
                          </div>
                        )}
                        {item.desventaja && (
                          <div className="bg-rose-50/50 border border-rose-100 p-2.5 rounded-xl text-xs text-slate-600">
                            <strong className="text-rose-700">✗ Desventaja:</strong> {item.desventaja}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Curiosidad */}
                    {item.dato_curiosidad && (
                      <div className="flex gap-2 items-start text-xs text-amber-800 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100/50">
                        <Sparkles className="w-4 h-4 flex-shrink-0 text-amber-500 mt-0.5" />
                        <span className="italic leading-normal"><strong>¿Sabías que?</strong> {item.dato_curiosidad}</span>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-8 text-center text-slate-500 border border-slate-100 text-sm">
          No se encontraron términos para "{searchQuery}".
        </Card>
      )}

    </div>
  );
}
