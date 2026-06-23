/**
 * Badge o etiqueta de estado para niveles, categorías o prioridades.
 */
export default function Badge({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold tracking-wide uppercase';
  
  const variants = {
    primary: 'bg-primary-100 text-primary-800 border border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-100',
    accent: 'bg-accent-100 text-accent-700 border border-accent-100',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200/50',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200/50',
    danger: 'bg-rose-100 text-rose-800 border border-rose-200/50',
    neutral: 'bg-white text-ink border border-slate-200'
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
