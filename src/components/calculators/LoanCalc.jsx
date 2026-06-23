import { useState } from 'react';
import Card from '../ui/Card';
import { generateAmortizationTable } from '../../utils/calculator';
import { formatNIO } from '../../utils/currency';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

/**
 * Calculadora de Préstamos con Amortización Francesa e indicadores de alerta de deudas.
 */
export default function LoanCalc() {
  const [monto, setMonto] = useState(5000);
  const [tasa, setTasa] = useState(24); // 24% interés anual por defecto
  const [plazo, setPlazo] = useState(12); // 12 meses

  // Presets de préstamos en Nicaragua
  const presetsPrestatarios = [
    { label: 'Hipotecario Banco (12% Anual)', tasa: 12 },
    { label: 'Personal Banco (24% Anual)', tasa: 24 },
    { label: 'MIPYME Cooperativa (36% Anual)', tasa: 36 },
    { label: 'Prestamista Informal (60%+ Anual)', tasa: 60 }
  ];

  // Cálculo de tabla
  const res = generateAmortizationTable(monto, tasa, plazo);
  const { cuotaMensual, totalPagado, totalInteres, tabla = [] } = res;

  // Analizar gravedad de la tasa de interés
  const getTasaStatus = (t) => {
    if (t < 18) return { label: 'Tasa Razonable', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: Info };
    if (t <= 36) return { label: 'Tasa Alta (Microcréditos)', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: AlertTriangle };
    return { label: 'Tasa Peligrosa (Prestamistas)', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: ShieldAlert };
  };

  const status = getTasaStatus(tasa);
  const StatusIcon = status.icon;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
      
      {/* Sección de Inputs */}
      <Card className="p-6 border border-slate-100 space-y-5">
        <div>
          <h3 className="font-black text-ink text-lg">Simula un Préstamo</h3>
          <p className="text-xs text-slate-400 mt-0.5">Calcula la cuota mensual y el total de intereses que pagarás.</p>
        </div>

        {/* Monto del Préstamo */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase">
            Monto a solicitar (Córdobas)
          </label>
          <input
            type="number"
            value={monto || ''}
            onChange={(e) => setMonto(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
          />
        </div>

        {/* Tasa Anual */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase">
            Tasa de interés anual (%)
          </label>

          {/* Presets */}
          <div className="grid grid-cols-2 gap-2">
            {presetsPrestatarios.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTasa(preset.tasa)}
                className={`py-2 px-3 text-[10px] font-bold border rounded-xl text-left transition-all leading-normal ${
                  tasa === preset.tasa
                    ? 'border-primary-700 bg-primary-50 text-primary-800 font-extrabold shadow-sm'
                    : 'border-primary-100 bg-white text-slate-600 hover:bg-primary-50/40'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <input
            type="number"
            value={tasa || ''}
            onChange={(e) => setTasa(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
            placeholder="Tasa de interés anual (%)"
          />

          {/* Alerta del estado de la tasa */}
          <div className={`flex items-center gap-2.5 border p-2.5 rounded-xl text-xs font-semibold ${status.color}`}>
            <StatusIcon className="w-4 h-4 flex-shrink-0" />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Plazo del Préstamo */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
            <span>Plazo: {plazo} meses</span>
            <span>Máx: 36 meses</span>
          </div>
          <input
            type="range"
            min="3"
            max="36"
            step="3"
            value={plazo}
            onChange={(e) => setPlazo(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>
      </Card>

      {/* Resultados de la Simulación */}
      <div className="space-y-5">
        
        {/* Resumen Financiero */}
        <Card className="p-6 border border-slate-100 bg-white space-y-4">
          <div className="text-center pb-4 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Cuota Mensual Estimada</p>
            <p className="text-2xl md:text-3xl font-black text-ink tracking-tight mt-2 leading-none">
              {formatNIO(cuotaMensual)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Total a pagar</span>
              <span className="text-sm md:text-base font-black text-ink block mt-1">
                {formatNIO(totalPagado)}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Total de intereses</span>
              <span className="text-sm md:text-base font-black text-rose-600 block mt-1">
                {formatNIO(totalInteres)}
              </span>
            </div>
          </div>
        </Card>

        {/* Tabla de amortización simplificada */}
        <Card className="p-4 border border-slate-100 space-y-3">
          <h4 className="font-bold text-slate-700 text-xs">Tabla de pagos primeros meses</h4>
          
          <div className="overflow-x-auto border border-slate-50 rounded-xl">
            <table className="w-full text-left border-collapse text-[11px] md:text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-100">
                  <th className="p-2 font-bold">Mes</th>
                  <th className="p-2 font-bold">Cuota</th>
                  <th className="p-2 font-bold">Interés</th>
                  <th className="p-2 font-bold">Capital</th>
                  <th className="p-2 font-bold">Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {tabla.map((fila, idx) => (
                  <tr key={idx} className="hover:bg-primary-50/30">
                    <td className="p-2 font-bold text-ink">#{fila.cuotaNum}</td>
                    <td className="p-2 font-semibold">{formatNIO(fila.cuota)}</td>
                    <td className="p-2 text-rose-500 font-semibold">{formatNIO(fila.interes)}</td>
                    <td className="p-2 text-emerald-600 font-semibold">{formatNIO(fila.capital)}</td>
                    <td className="p-2 text-slate-400 italic">{formatNIO(fila.saldoRestante)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  );
}
