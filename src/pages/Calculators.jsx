import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BudgetCalc from '../components/calculators/BudgetCalc';
import EmergencyFundCalc from '../components/calculators/EmergencyFundCalc';
import CompoundInterestCalc from '../components/calculators/CompoundInterestCalc';
import LoanCalc from '../components/calculators/LoanCalc';
import ProductComparator from '../components/calculators/ProductComparator';
import { Calculator, PieChart, ShieldAlert, BarChart3, Landmark, Percent } from 'lucide-react';

const CALCULATOR_TABS = [
  { id: 'presupuesto', label: 'Presupuesto simple', icon: PieChart, component: BudgetCalc },
  { id: 'fondo_emergencia', label: 'Escudo de emergencia', icon: ShieldAlert, component: EmergencyFundCalc },
  { id: 'interes_compuesto', label: 'Interés compuesto', icon: BarChart3, component: CompoundInterestCalc },
  { id: 'deuda', label: 'Simular préstamo', icon: Percent, component: LoanCalc },
  { id: 'comparador', label: 'Comparar opciones', icon: Landmark, component: ProductComparator }
];

/**
 * Hub central de las Calculadoras Financieras.
 * Ofrece pestañas de navegación con scroll horizontal en móviles.
 */
export default function Calculators() {
  const location = useLocation();

  // Estado de pestaña activa, con soporte de redirecciones externas (ej: lecciones)
  const [activeTab, setActiveTab] = useState(() => {
    const requestedTab = location.state?.activeTab;
    return CALCULATOR_TABS.some(t => t.id === requestedTab) ? requestedTab : 'presupuesto';
  });

  const ActiveComponent = CALCULATOR_TABS.find(t => t.id === activeTab)?.component || BudgetCalc;

  return (
    <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 space-y-6 text-left">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
          Simuladores Interactivos
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-ink tracking-tight mt-1 leading-tight flex items-center gap-2">
          <Calculator className="w-6 h-6 text-primary-700" />
          Calculadoras Financieras
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-2">
          Realiza simulaciones rápidas e interactivas adaptadas al contexto monetario y bancario de Nicaragua.
        </p>
      </div>

      {/* Navegación horizontal de Pestañas (Tabs) */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          {CALCULATOR_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs md:text-sm font-extrabold border transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'border-primary-700 bg-primary-700 text-white shadow-paper'
                  : 'border-primary-100 bg-white text-slate-500 hover:border-primary-200 hover:bg-primary-50/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Renderizado de la Calculadora activa */}
      <div className="pt-2">
        <ActiveComponent />
      </div>

    </div>
  );
}
