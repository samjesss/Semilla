import { useState } from 'react';
import Card from '../ui/Card';
import { compoundInterestData } from '../../utils/calculator';
import { formatNIO, formatUSD, TASA_CAMBIO } from '../../utils/currency';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Info } from 'lucide-react';

/**
 * Calculadora de Interés Compuesto con gráficas comparativas de Recharts.
 */
export default function CompoundInterestCalc() {
  // Estado de moneda: NIO o USD
  const [currency, setCurrency] = useState('NIO'); // 'NIO' | 'USD'

  // Inputs iniciales
  const [principal, setPrincipal] = useState(1000);
  const [contribución, setContribución] = useState(200);
  const [tasaPreseteada, setTasaPreseteada] = useState(6.5); // tasa predefinida
  const [plazoMeses, setPlazoMeses] = useState(12);

  // Mapear presets de tasas nicas
  const presetsTasas = [
    { label: 'Cuenta Ahorro Banco (2.5%)', tasa: 2.5 },
    { label: 'Cooperativa Socios (5.5%)', tasa: 5.5 },
    { label: 'Certificado Depósito CD (6.5%)', tasa: 6.5 },
    { label: 'CD BAC Plazo Largo (7.5%)', tasa: 7.5 }
  ];

  const formatMoneda = (val) => {
    return currency === 'NIO' ? formatNIO(val) : formatUSD(val);
  };

  // Generar datos para la gráfica
  const dataGrafico = compoundInterestData(principal, contribución, tasaPreseteada, plazoMeses);
  const ultimoDato = dataGrafico[dataGrafico.length - 1] || { saldo: principal, sinInteres: principal, interesGanado: 0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
      
      {/* Inputs de la simulación */}
      <Card className="p-6 border border-slate-100 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-black text-ink text-lg">Haz crecer tus ahorros</h3>
            <p className="text-xs text-slate-400 mt-0.5">Mira cómo trabaja el interés compuesto.</p>
          </div>

          {/* Toggle de Moneda */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                if (currency === 'USD') {
                  setCurrency('NIO');
                  setPrincipal(p => Math.round(p * TASA_CAMBIO.USD_TO_NIO));
                  setContribución(c => Math.round(c * TASA_CAMBIO.USD_TO_NIO));
                }
              }}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currency === 'NIO' ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              C$ NIO
            </button>
            <button
              onClick={() => {
                if (currency === 'NIO') {
                  setCurrency('USD');
                  setPrincipal(p => Math.round(p / TASA_CAMBIO.USD_TO_NIO));
                  setContribución(c => Math.round(c / TASA_CAMBIO.USD_TO_NIO));
                }
              }}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currency === 'USD' ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Depósito inicial */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase">
            Depósito Inicial ({currency})
          </label>
          <input
            type="number"
            value={principal || ''}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
          />
        </div>

        {/* Aporte mensual */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase">
            Aporte extra cada mes ({currency})
          </label>
          <input
            type="number"
            value={contribución || ''}
            onChange={(e) => setContribución(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
          />
        </div>

        {/* Tasa de interés */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase">
            Tasa de interés anual (%)
          </label>
          
          {/* Presets */}
          <div className="grid grid-cols-2 gap-2">
            {presetsTasas.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTasaPreseteada(preset.tasa)}
                className={`py-2 px-3 text-[10px] font-bold border rounded-xl text-left transition-all leading-normal ${
                  tasaPreseteada === preset.tasa
                    ? 'border-primary-700 bg-primary-50 text-primary-800 font-extrabold shadow-sm'
                    : 'border-primary-100 bg-white text-slate-600 hover:bg-primary-50/40'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="relative pt-2">
            <span className="absolute right-4 top-1/2 translate-y-[10%] text-slate-400 font-bold text-sm">%</span>
            <input
              type="number"
              step="0.1"
              value={tasaPreseteada || ''}
              onChange={(e) => setTasaPreseteada(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
              placeholder="Tasa personalizada"
            />
          </div>
        </div>

        {/* Plazo en meses slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
            <span>Plazo: {plazoMeses} meses</span>
            <span>Máx: 60 meses</span>
          </div>
          <input
            type="range"
            min="6"
            max="60"
            step="6"
            value={plazoMeses}
            onChange={(e) => setPlazoMeses(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>

      </Card>

      {/* Resultados y Gráfico de barras */}
      <div className="space-y-5">
        
        {/* Resumen numérico */}
        <Card className="p-5 border border-slate-100 grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Total al final</span>
            <span className="text-base font-black text-ink tracking-tight leading-none block pt-1">
              {formatMoneda(ultimoDato.saldo)}
            </span>
          </div>
          <div className="space-y-1 border-x border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Tu depósito</span>
            <span className="text-base font-black text-ink tracking-tight leading-none block pt-1">
              {formatMoneda(ultimoDato.sinInteres)}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-primary-600 uppercase block leading-none">Interés ganado</span>
            <span className="text-base font-black text-primary-700 tracking-tight leading-none block pt-1">
              + {formatMoneda(ultimoDato.interesGanado)}
            </span>
          </div>
        </Card>

        {/* Gráfico BarChart de Recharts */}
        <Card className="p-5 border border-slate-100 flex flex-col justify-center min-h-[300px]">
          <h4 className="font-bold text-slate-700 text-sm mb-3">Crecimiento: Ahorro en Banco vs Colchón</h4>
          
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataGrafico} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fontSize: 9, fontWeight: 'bold' }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9, fontWeight: 'bold' }} stroke="#94a3b8" />
                <Tooltip 
                  formatter={(value) => [formatMoneda(value)]}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                <Bar name="Ahorro con Interés" dataKey="saldo" fill="#126947" radius={[4, 4, 0, 0]} />
                <Bar name="Ahorro bajo el Colchón" dataKey="sinInteres" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Consejo Curioso */}
        <Card className="p-4 border border-slate-100 flex gap-2.5 items-start">
          <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-500 leading-normal text-left">
            Si reinviertes tus intereses ganados al finalizar cada mes, tu dinero crece exponencialmente.
            Los bancos en Nicaragua pagan tasas más altas en Certificados de Depósito a Plazo Fijo comparado con las cuentas de ahorro corrientes.
          </p>
        </Card>
      </div>

    </div>
  );
}
