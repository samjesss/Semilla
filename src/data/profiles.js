/**
 * Definición de los 4 perfiles financieros de Semilla.
 */
export const PROFILES = {
  principiante: {
    id: 'principiante',
    nombre: 'El Principiante',
    emoji: '🌱',
    color: '#16A34A', // verde
    descripcion: 'Estás dando tus primeros pasos en el manejo del dinero sobrante. Lo más importante en este momento es ordenar tu presupuesto y abrir una cuenta segura para no guardar el dinero en casa.',
    mensajePrincipal: 'Cada gran árbol empezó siendo una pequeña semilla. ¡Comencemos a sembrar!',
    prioridades: ['abrir_cuenta', 'fondo_emergencia', 'presupuesto']
  },
  guardador: {
    id: 'guardador',
    nombre: 'El Guardador',
    emoji: '🪙',
    color: '#2563EB', // azul
    descripcion: 'Ya tienes la costumbre de guardar dinero, pero tenerlo acumulado en casa o en cuentas básicas sin rendimiento hace que pierda valor. Es momento de que tu dinero empiece a trabajar para ti de forma segura.',
    mensajePrincipal: 'Ahorrar es un gran hábito. Hacer crecer ese ahorro con intereses es el siguiente paso lógico.',
    prioridades: ['fondo_emergencia', 'certificado_deposito', 'billeteras_digitales']
  },
  planificador: {
    id: 'planificador',
    nombre: 'El Planificador',
    emoji: '📊',
    color: '#7C3AED', // morado
    descripcion: 'Cuentas con una base financiera organizada y productos bancarios. Tu objetivo ahora es optimizar los rendimientos de tus ahorros utilizando certificados de depósito, cooperativas de crédito y estrategias de diversificación.',
    mensajePrincipal: 'El que planifica hoy, cosecha mañana. Tienes la estructura; ahora busquemos mejores rendimientos.',
    prioridades: ['certificado_deposito', 'cooperativa', 'diversificacion']
  },
  inversionista: {
    id: 'inversionista',
    nombre: 'El Inversionista en Formación',
    emoji: '📈',
    color: '#EA580C', // naranja
    descripcion: 'Tienes conocimientos y un flujo de dinero saludable. Estás listo para dar el salto hacia inversiones de mediano y largo plazo, diversificación de activos o inyección de capital en negocios propios o familiares.',
    mensajePrincipal: 'Tu dinero ya sabe trabajar. Ahora enséñale a trabajar en varios lugares a la vez.',
    prioridades: ['diversificacion', 'microempresa', 'cooperativa']
  }
};

/**
 * Retorna un perfil por su ID, con fallback a principiante.
 * @param {string} id 
 * @returns {Object}
 */
export function getProfileById(id) {
  return PROFILES[id] || PROFILES.principiante;
}
