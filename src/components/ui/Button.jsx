/**
 * Botón reutilizable con diseño premium, gradientes y micro-animaciones.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  // Clases base para el botón (incluyendo animaciones y enfoque)
  const baseClasses = 'inline-flex items-center justify-center font-extrabold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none disabled:active:translate-y-0';

  // Variantes estéticas premium con gradientes o contornos
  const variants = {
    primary: 'bg-primary-700 hover:bg-primary-800 text-white border border-primary-800 shadow-[0_4px_0_#073c2c] hover:shadow-[0_3px_0_#073c2c] focus:ring-primary-500',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white border border-secondary-700 shadow-[0_4px_0_#1c3d79] hover:shadow-[0_3px_0_#1c3d79] focus:ring-secondary-500',
    accent: 'bg-accent-500 hover:bg-accent-600 text-ink border border-accent-600 shadow-[0_4px_0_#8c5a10] hover:shadow-[0_3px_0_#8c5a10] focus:ring-accent-500',
    outline: 'border border-primary-200 text-primary-800 bg-white hover:bg-primary-50 focus:ring-primary-200',
    ghost: 'text-ink hover:bg-primary-50 hover:text-primary-800 focus:ring-primary-200',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white border border-rose-700 shadow-[0_4px_0_#9f1239] hover:shadow-[0_3px_0_#9f1239] focus:ring-rose-500'
  };

  // Tamaños de botón
  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
