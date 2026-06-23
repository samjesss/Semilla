/**
 * Logros e insignias (Badges) ganados por el progreso educativo en Semilla.
 */
export const BADGES = {
  badge_organizador: {
    id: 'badge_organizador',
    nombre: 'Organizador Financiero',
    emoji: '📋',
    color: '#16A34A', // verde
    descripcion: 'Otorgado por completar el Módulo 1 y entender cómo estructurar tu presupuesto con la regla 50/30/20.'
  },
  badge_ahorrista: {
    id: 'badge_ahorrista',
    nombre: 'Ahorrista Inteligente',
    emoji: '💡',
    color: '#2563EB', // azul
    descripcion: 'Otorgado por completar el Módulo 2 y comprender el poder del interés compuesto y los certificados de depósito.'
  },
  badge_solidario: {
    id: 'badge_solidario',
    nombre: 'Miembro Solidario',
    emoji: '🤝',
    color: '#7C3AED', // morado
    descripcion: 'Otorgado por completar el Módulo 3 y conocer el funcionamiento cooperativo de ahorro y crédito en Nicaragua.'
  },
  badge_credito: {
    id: 'badge_credito',
    nombre: 'Maestro del Crédito',
    emoji: '⚖️',
    color: '#DC2626', // rojo
    descripcion: 'Otorgado por completar el Módulo 4 y dominar el uso inteligente del crédito y las estrategias para liquidar deudas.'
  },
  badge_visionario: {
    id: 'badge_visionario',
    nombre: 'Visionario Financiero',
    emoji: '🔭',
    color: '#EA580C', // naranja
    descripcion: 'Otorgado por completar el Módulo 5 y entender el impacto de la inflación, la diversificación y las metas de largo plazo.'
  }
};

/**
 * Retorna un badge por su ID.
 * @param {string} id 
 * @returns {Object|undefined}
 */
export function getBadgeById(id) {
  return BADGES[id];
}
