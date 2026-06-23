/**
 * Barra de progreso animada para el onboarding, lecciones o metas de ahorro.
 */
export default function ProgressBar({
  progress = 0, // Porcentaje de 0 a 100
  color = 'primary', // 'primary', 'secondary', 'accent'
  showText = false,
  className = '',
  height = 'h-2.5',
  ...props
}) {
  const boundedProgress = Math.min(100, Math.max(0, progress));

  const colors = {
    primary: 'bg-primary-700',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-600'
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      <div className="flex items-center justify-between mb-1.5">
        {showText && (
          <span className="text-xs font-semibold text-slate-500">Progreso</span>
        )}
        {showText && (
          <span className="text-xs font-bold text-slate-700">{Math.round(boundedProgress)}%</span>
        )}
      </div>
      <div className={`w-full bg-primary-100/60 rounded-full overflow-hidden ${height}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors[color]}`}
          style={{ width: `${boundedProgress}%` }}
        />
      </div>
    </div>
  );
}
