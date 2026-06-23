import { useEffect } from 'react';

/**
 * Modal general reutilizable para celebraciones de insignias, detalles de recomendaciones o disclaimers.
 */
export default function Modal({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  ...props
}) {
  // Evitar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop con desenfoque de fondo */}
      <div 
        className="fixed inset-0 bg-ink/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Caja del Modal */}
      <div 
        className={`relative w-full ${sizes[size]} bg-white rounded-lg shadow-2xl border border-primary-100 overflow-hidden transform transition-all duration-300 animate-scale-bounce z-10 p-6`}
        {...props}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between pb-3 border-b border-primary-100 mb-4">
          <h3 className="text-lg font-black text-ink">{title}</h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Contenido */}
        <div className="max-h-[75vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}
