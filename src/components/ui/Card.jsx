/**
 * Contenedor de tarjeta (Card) con soporte de bordes suaves, sombras y efectos de vidrio.
 */
export default function Card({
  children,
  className = '',
  variant = 'default',
  hoverEffect = false,
  onClick,
  ...props
}) {
  const baseClasses = 'rounded-lg transition-all duration-300';
  
  // Estilos de tarjeta premium
  const variants = {
    default: 'bg-white border border-primary-100/40 shadow-paper',
    flat: 'bg-surface border border-primary-100/50',
    glass: 'glass-panel shadow-soft',
    darkGlass: 'dark-glass-panel text-white shadow-xl',
    accent: 'bg-accent-50 border border-accent-100 shadow-paper'
  };

  const hoverClass = hoverEffect 
    ? 'hover:-translate-y-0.5 hover:shadow-paper hover:border-primary-200 cursor-pointer active:translate-y-0' 
    : '';

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${hoverClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
