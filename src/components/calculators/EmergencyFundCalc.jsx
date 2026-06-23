import { useState } from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { formatNIO } from '../../utils/currency';
import useUserStore from '../../store/useUserStore';
import { Shield, Sparkles } from 'lucide-react';

/**
 * Calculadora de Fondo de Emergencia con estimación de tiempo.
 */
export default function EmergencyFundCalc() {
  const { userInfo } = useUserStore();

  // Inicializar inputs con estimaciones o valores estándar
  const [comida, setComida] = useState(3000);
  const [servicios, setServicios] = useState(1000);
  const [transporte, setTransporte] = useState(500);
  const [otros, setOtros] = useState(500);
  const [coberturaMeses, setCoberturaMeses] = useState(3); // 3 o 6 meses
  const [ahorroMensual, setAhorroMensual] = useState(
    userInfo.sobranteEstimadoNIO > 0 ? userInfo.sobranteEstimadoNIO : 1000
  );
  const [ahorroActual, setAhorroActual] = useState(0);

  // Cálculos
  const gastoMensualTotal = comida + servicios + transporte + otros;
  const metaTotal = gastoMensualTotal * coberturaMeses;
  const saldoFaltante = Math.max(0, metaTotal - ahorroActual);
  const tiempoEstimadoMeses = ahorroMensual > 0 ? Math.ceil(saldoFaltante / ahorroMensual) : Infinity;
  const progressPercent = metaTotal > 0 ? (ahorroActual / metaTotal) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
      
      {/* Sección de Inputs */}
      <Card className="p-6 border border-slate-100 space-y-5">
        <div>
          <h3 className="font-black text-ink text-lg">Tus Gastos Básicos</h3>
          <p className="text-xs text-slate-400 mt-0.5">Ingresa tus egresos obligatorios del hogar para calcular la meta.</p>
        </div>

        {/* Inputs de Gastos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Comida Mensual</label>
            <input
              type="number"
              value={comida || ''}
              onChange={(e) => setComida(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Luz, Agua, Gas</label>
            <input
              type="number"
              value={servicios || ''}
              onChange={(e) => setServicios(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Transporte / Bus / Moto</label>
            <input
              type="number"
              value={transporte || ''}
              onChange={(e) => setTransporte(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Otros Esenciales</label>
            <input
              type="number"
              value={otros || ''}
              onChange={(e) => setOtros(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
            />
          </div>
        </div>

        <div className="border-t border-slate-50 pt-4 space-y-4">
          {/* Ahorro Actual y Ahorro Mensual */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Ahorro actual que posees</label>
              <input
                type="number"
                value={ahorroActual || ''}
                onChange={(e) => setAhorroActual(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase">¿Cuánto puedes ahorrar al mes?</label>
              <input
                type="number"
                value={ahorroMensual || ''}
                onChange={(e) => setAhorroMensual(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-sm"
              />
            </div>
          </div>

          {/* Toggle de Cobertura */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">Cobertura deseada</label>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setCoberturaMeses(3)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                  coberturaMeses === 3
                    ? 'border-primary-700 bg-primary-50 text-primary-800'
                    : 'border-primary-100 bg-white text-slate-500 hover:bg-primary-50/40'
                }`}
              >
                3 Meses (Recomendado)
              </button>
              <button
                type="button"
                onClick={() => setCoberturaMeses(6)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                  coberturaMeses === 6
                    ? 'border-primary-700 bg-primary-50 text-primary-800'
                    : 'border-primary-100 bg-white text-slate-500 hover:bg-primary-50/40'
                }`}
              >
                6 Meses (Mayor Seguridad)
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Resultados de Escudo Financiero */}
      <div className="space-y-5">
        <Card className="p-6 border border-primary-800 bg-ink text-white space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary-100 uppercase tracking-wider leading-none">Meta del Escudo</p>
              <p className="text-xl md:text-2xl font-black mt-1 leading-none">
                {formatNIO(metaTotal)}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-1.5 border-t border-white/10">
            <div className="flex justify-between text-[10px] font-bold text-primary-100 uppercase">
              <span>Gastos del mes: {formatNIO(gastoMensualTotal)}</span>
              <span>Progreso: {Math.round(progressPercent)}%</span>
            </div>
            <ProgressBar progress={progressPercent} color="accent" height="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1.5">
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-[9px] font-bold text-primary-100 uppercase block">Meses para lograrlo</span>
              <span className="text-lg font-black mt-0.5 block">
                {tiempoEstimadoMeses === Infinity ? 'Ahorro Cero' : `${tiempoEstimadoMeses} meses`}
              </span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-[9px] font-bold text-primary-100 uppercase block">Faltante por ahorrar</span>
              <span className="text-lg font-black mt-0.5 block">
                {formatNIO(saldoFaltante)}
              </span>
            </div>
          </div>
        </Card>

        {/* Recomendación de Liquidez */}
        <Card className="p-5 border border-slate-100 space-y-3">
          <div className="flex gap-2.5 items-start">
            <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h4 className="font-bold text-ink text-sm">¿Dónde guardar tu Escudo de Emergencia?</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Este dinero debe estar disponible <strong>inmediatamente</strong> si pasa una urgencia.
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                <strong>Recomendación:</strong> no lo metas en inversiones cerradas a plazo. Guárdalo en una billetera móvil o una cuenta de ahorro básica que te deje sacar efectivo en agentes o cajeros.
              </p>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
