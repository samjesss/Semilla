import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatNIO } from '../../utils/currency';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Scale, TrendingUp } from 'lucide-react';

/**
 * Comparador interactivo de productos financieros reales en Nicaragua.
 * Compara cuentas tradicionales, CDs, cooperativas y billeteras digitales.
 */
export default function ProductComparator() {
  const [inversiónInicial, setInversiónInicial] = useState(3000);
  const [depositoMensual, setDepositoMensual] = useState(500);

  // Armar lista de productos comparables
  const productos = [
    {
      nombre: 'Cuenta de Ahorro Básica',
      institución: 'BANPRO',
      tipo: 'Banco',
      tasa: 2.5,
      minimo: 100,
      liquidez: 'Inmediata',
      regulador: 'SIBOIF',
      color: '#126947'
    },
    {
      nombre: 'Depósito a Plazo Fijo (CD) 12M',
      institución: 'BAC Credomatic',
      tipo: 'Banco',
      tasa: 6.8,
      minimo: 1000,
      liquidez: 'Al vencimiento (12 meses)',
      regulador: 'SIBOIF',
      color: '#2f6fcf'
    },
    {
      nombre: 'Ahorro Socias Cooperativa',
      institución: 'COOPEMUJER',
      tipo: 'Cooperativa',
      tasa: 5.5,
      minimo: 200,
      liquidez: 'Mensual / Programada',
      regulador: 'CONAMI',
      color: '#b85f43'
    },
    {
      nombre: 'Billetera Móvil (Ahorro)',
      institución: 'Billetera Banpro',
      tipo: 'Billetera Digital',
      tasa: 0.0, // las billeteras básicas usualmente no pagan intereses
      minimo: 0,
      liquidez: 'Inmediata',
      regulador: 'SIBOIF',
      color: '#e7ad35'
    }
  ];

  // Simular crecimiento a 12 meses
  const generarDatosCrecimiento = () => {
    const data = [];
    const plazos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    // Saldos iniciales
    let saldos = productos.map(() => inversiónInicial);

    plazos.forEach((mes) => {
      const fila = { mes: `Mes ${mes}` };
      
      productos.forEach((p, idx) => {
        const rMensual = (p.tasa / 100) / 12;
        // Saldo = Saldo anterior * (1 + tasa mensual) + aporte
        saldos[idx] = saldos[idx] * (1 + rMensual) + depositoMensual;
        
        // Formatear llave para el gráfico (ej. "BANPRO (Ahorro)")
        fila[`${p.institución}`] = Math.round(saldos[idx]);
      });
      data.push(fila);
    });

    return data;
  };

  const datosGrafico = generarDatosCrecimiento();

  return (
    <div className="space-y-6 text-left">
      
      {/* Explicación y Filtros */}
      <Card className="p-5 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-1">
          <h3 className="font-black text-ink text-base flex items-center gap-1.5">
            <Scale className="w-5 h-5 text-primary-700" />
            Compara el crecimiento
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-normal">
            Ingresa tu capital inicial y tu ahorro mensual para comparar cuánto acumularías en 1 año en cada opción.
          </p>
        </div>

        {/* Inputs de Simulación */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Inversión inicial (Córdobas)</label>
          <input
            type="number"
            value={inversiónInicial || ''}
            onChange={(e) => setInversiónInicial(Number(e.target.value))}
            className="w-full px-3.5 py-2 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Aporte mensual (Córdobas)</label>
          <input
            type="number"
            value={depositoMensual || ''}
            onChange={(e) => setDepositoMensual(Number(e.target.value))}
            className="w-full px-3.5 py-2 border border-primary-100 focus:border-primary-600 rounded-lg font-semibold outline-none text-xs"
          />
        </div>
      </Card>

      {/* Gráfico de Crecimiento */}
      <Card className="p-5 border border-slate-100 flex flex-col justify-center min-h-[300px]">
        <h4 className="font-bold text-slate-700 text-xs mb-3 flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-primary-700" />
          Proyección de crecimiento acumulado a 12 meses
        </h4>
        
        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datosGrafico} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="mes" tick={{ fontSize: 9, fontWeight: 'bold' }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9, fontWeight: 'bold' }} stroke="#94a3b8" />
              <Tooltip 
                formatter={(value) => [formatNIO(value)]}
                contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9' }}
              />
              <Legend wrapperStyle={{ fontSize: '9px', fontWeight: 'bold' }} />
              {productos.map((p, idx) => (
                <Line 
                  key={idx}
                  type="monotone"
                  dataKey={p.institución}
                  stroke={p.color}
                  strokeWidth={2.5}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tabla Comparativa de Productos */}
      <Card className="p-4 border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 text-slate-400 border-b border-slate-100">
              <th className="p-3 font-bold">Producto</th>
              <th className="p-3 font-bold">Institución</th>
              <th className="p-3 font-bold">Tasa Anual</th>
              <th className="p-3 font-bold">Apertura Mín.</th>
              <th className="p-3 font-bold">Liquidez</th>
              <th className="p-3 font-bold">Regulado por</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {productos.map((p, idx) => (
              <tr key={idx} className="hover:bg-primary-50/30">
                <td className="p-3 font-bold text-ink flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.nombre}
                </td>
                <td className="p-3 font-semibold text-slate-700">{p.institución}</td>
                <td className="p-3 text-primary-600 font-bold">
                  {p.tasa > 0 ? `${p.tasa}%` : '0.0% (Mantenimiento)'}
                </td>
                <td className="p-3 font-semibold">
                  {p.minimo > 0 ? formatNIO(p.minimo) : 'C$ 0'}
                </td>
                <td className="p-3 text-xs text-slate-500 italic">{p.liquidez}</td>
                <td className="p-3">
                  <Badge variant={p.regulador === 'SIBOIF' ? 'secondary' : 'accent'} className="text-[9px]">
                    {p.regulador}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Info regulaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500">
        <Card className="p-4 border border-primary-100/50 bg-surface">
          <h5 className="font-bold text-slate-700 mb-1">Superintendencia de Bancos (SIBOIF)</h5>
          <p className="leading-relaxed">
            Regula y audita a los bancos del país. Tus ahorros están garantizados por el FOGADE hasta por un total equivalente a <strong>$12,000 USD</strong> por cliente y entidad.
          </p>
        </Card>
        <Card className="p-4 border border-primary-100/50 bg-surface">
          <h5 className="font-bold text-slate-700 mb-1">Comisión de Microfinanzas (CONAMI)</h5>
          <p className="leading-relaxed">
            Regula y supervisa a las cooperativas de ahorro y crédito y microfinancieras locales, velando por las buenas prácticas y cobros transparentes.
          </p>
        </Card>
      </div>

    </div>
  );
}
