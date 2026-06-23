import Card from '../ui/Card';
import { formatNIO } from '../../utils/currency';
import useUserStore from '../../store/useUserStore';
import { 
  TrendingUp, 
  PiggyBank, 
  CreditCard, 
  Wallet
} from 'lucide-react';

/**
 * Muestra métricas rápidas de la situación del usuario en base a su Onboarding.
 */
export default function QuickStats() {
  const { userInfo } = useUserStore();

  const stats = [
    {
      label: 'Recibes al mes',
      value: formatNIO(userInfo.remesaMensualNIO || 0),
      icon: TrendingUp,
      color: 'text-primary-700 bg-primary-50 border-primary-100',
    },
    {
      label: 'Podrías separar',
      value: formatNIO(userInfo.sobranteEstimadoNIO || 0),
      icon: PiggyBank,
      color: 'text-accent-700 bg-accent-50 border-accent-100',
    },
    {
      label: 'Cuenta segura',
      value: userInfo.tieneCuentaBancaria ? 'Sí' : 'Pendiente',
      icon: Wallet,
      color: userInfo.tieneCuentaBancaria 
        ? 'text-secondary-700 bg-secondary-50 border-secondary-100' 
        : 'text-clay bg-orange-50 border-orange-100',
    },
    {
      label: 'Deudas',
      value: userInfo.tieneDeudas ? 'Revisar' : 'Sin deudas',
      icon: CreditCard,
      color: userInfo.tieneDeudas 
        ? 'text-rose-700 bg-rose-50 border-rose-100' 
        : 'text-primary-700 bg-primary-50 border-primary-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="p-3 md:p-5 border border-primary-100/40 flex flex-col justify-between space-y-2 md:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-wider leading-none">
                {stat.label}
              </span>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center border ${stat.color} flex-shrink-0`}>
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.25]" />
              </div>
            </div>
            <div>
              <p className="text-sm md:text-lg font-black text-ink tracking-tight leading-none">
                {stat.value}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
