/**
 * Botón de opción de respuesta para el quiz. Soporta selección simple y múltiple,
 * e integra micro-animaciones al hacer hover o al estar seleccionado.
 */
export default function OptionButton({
  option,
  isSelected = false,
  onClick
}) {
  const iconLength = option.icono ? Array.from(option.icono).length : 0;
  const iconSize = iconLength > 2 ? 'text-[13px]' : iconLength > 1 ? 'text-[15px]' : 'text-xl';
  const baseClasses = 'flex items-center w-full p-3.5 md:p-4 rounded-lg border transition-all duration-200 text-left active:translate-y-px';
  
  const stateClasses = isSelected
    ? 'border-primary-600 bg-primary-50 text-ink shadow-paper'
    : 'border-primary-100/50 bg-white text-slate-600 hover:border-primary-200 hover:bg-primary-50/40 hover:shadow-sm';

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses}`}
      onClick={onClick}
    >
      {/* Emoji / Icono */}
      {option.icono && (
        <span className={`w-11 h-11 rounded-lg bg-accent-50 border border-accent-100 flex flex-shrink-0 items-center justify-center mr-3 select-none overflow-hidden leading-none whitespace-nowrap ${iconSize}`} role="img" aria-label={option.texto}>
          {option.icono}
        </span>
      )}

      {/* Textos */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-ink text-sm md:text-base leading-snug break-words">
          {option.texto}
        </p>
        {option.equivalencia && (
          <p className="text-xs text-primary-700 font-bold mt-0.5">
            {option.equivalencia}
          </p>
        )}
      </div>

      <div className={`ml-3 w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center ${
        isSelected ? 'border-primary-700 bg-primary-700' : 'border-primary-100 bg-white'
      }`}>
        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}
