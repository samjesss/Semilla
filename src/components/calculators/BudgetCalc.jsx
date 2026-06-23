import { useState } from 'react';
import Card from '../ui/Card';
import { calculateBudget503020 } from '../../utils/calculator';
import { formatNIO } from '../../utils/currency';
import useUserStore from '../../store/useUserStore';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

/**
 * Calculadora interactiva 50/30/20 con gráficos circulares de Recharts.
 */
export default function BudgetCalc() {
  const { userInfo } = useUserStore();
  const [remesa, setRemesa] = useState(
    userInfo.remesaMensualNIO > 0 ? userInfo.remesaMensualNIO : 5000
  );

  const budget = calculateBudget503020(remesa);

  // Datos estructurados para Recharts
  const chartData = [
    { name: 'Necesidades (50%)', value: budget.necesidades, color: '#16A34A' }, // Verde
    { name: 'Deseos (30%)', value: budget.deseos, color: '#3B82F6' },       // Azul
    { name: 'Ahorro (20%)', value: budget.ahorro, color: '#EA580C' }         // Naranja
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
      
      {/* Inputs y Resultados */}
      <Card className="p-6 border border-slate-100 space-y-6">
        <div>
          <h3 className="font-black text-ink text-lg">Distribuye tu Remesa</h3>
          <p className="text-xs text-slate-400 mt-0.5">Ingresa el monto de dinero mensual para ver la recomendación 50/30/20.</p>
        </div>

        {/* Input del monto de la remesa */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase">
            Monto de remesa mensual (en córdobas):
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">C$</span>
            <input
              type="number"
              value={remesa || ''}
              min="500"
              onChange={(e) => setRemesa(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none transition-colors"
              placeholder="Ingresa un monto"
            />
          </div>
        </div>

        {/* Resultados explicados */}
        <div className="space-y-3 pt-3 border-t border-slate-50">
          {chartData.map((data, idx) => (
            <div key={idx} className="flex justify-between items-center bg-surface p-3 rounded-lg border border-primary-100/40">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: data.color }} />
                <div>
                  <p className="font-bold text-ink text-xs md:text-sm">{data.name}</p>
                  <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                    {idx === 0 && 'Comida, luz, agua, pasajes'}
                    {idx === 1 && 'Salidas, antojos, compras'}
                    {idx === 2 && 'Tu fondo de emergencias o depósito'}
                  </p>
                </div>
              </div>
              <span className="font-black text-ink text-sm md:text-base text-right flex-shrink-0">
                {formatNIO(data.value)}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Gráfico Donut Chart */}
      <Card className="p-6 border border-slate-100 flex flex-col items-center justify-center min-h-[350px]">
        <h4 className="font-bold text-slate-700 text-sm mb-4">Representación Visual de tu Presupuesto</h4>
        
        {remesa > 0 ? (
          <div className="w-full h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatNIO(value), 'Monto']}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Texto en medio del donut */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%] text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total</p>
              <p className="text-base font-black text-ink tracking-tight mt-1 leading-none">
                {formatNIO(remesa)}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-xs">Por favor, ingresa un monto válido mayor a 0 para ver el gráfico.</p>
        )}
      </Card>

    </div>
  );
}
