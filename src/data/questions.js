/**
 * Cuestionario de Onboarding para la herramienta Semilla.
 * Consta de 7 preguntas enfocadas en tomar una primera decisión práctica.
 * Sección A: Situación con las Remesas (A1, A2, A4)
 * Sección B: Situación Financiera Actual (B1 - B3)
 * Sección C: Meta Principal (C1)
 */
export const QUESTIONS = [
  // --- SECCIÓN A: Tu Situación con las Remesas ---
  {
    id: 'A1',
    seccion: 'A',
    seccionTitulo: 'Tu Situación con las Remesas',
    pregunta: '¿Con qué frecuencia te mandan dinero del exterior?',
    descripcion: 'Esto nos ayuda a saber la regularidad de tus ingresos adicionales.',
    tipo: 'seleccion_unica',
    opciones: [
      { id: 'semana', texto: 'Cada semana', icono: '🗓' },
      { id: 'quincena', texto: 'Cada quincena', icono: '📅' },
      { id: 'mes', texto: 'Cada mes', icono: '📆' },
      { id: 'ocasional', texto: 'De vez en cuando (sin fecha fija)', icono: '🎲' }
    ]
  },
  {
    id: 'A2',
    seccion: 'A',
    seccionTitulo: 'Tu Situación con las Remesas',
    pregunta: '¿Cuánto recibes normalmente en cada remesa? (en dólares)',
    descripcion: 'Indica el monto aproximado que te envían.',
    tipo: 'seleccion_unica',
    opciones: [
      { id: 'menos100', texto: 'Menos de $100', equivalencia: 'Menos de C$ 3,660', icono: '💵' },
      { id: 'cien200', texto: 'Entre $100 y $200', equivalencia: 'Aprox. C$ 3,660 – C$ 7,320', icono: '💵💵' },
      { id: 'dos400', texto: 'Entre $200 y $400', equivalencia: 'Aprox. C$ 7,320 – C$ 14,650', icono: '💵💵💵' },
      { id: 'mas400', texto: 'Más de $400', equivalencia: 'Más de C$ 14,650', icono: '💰' }
    ]
  },
  {
    id: 'A4',
    seccion: 'A',
    seccionTitulo: 'Tu Situación con las Remesas',
    pregunta: 'Después de pagar comida, luz, agua y transporte, ¿cuánto te queda normalmente?',
    descripcion: 'Este es tu "sobrante" mensual para el ahorro o inversión.',
    tipo: 'seleccion_unica',
    opciones: [
      { id: 'nada', texto: 'Casi nada (menos de C$ 500)', icono: '😟' },
      { id: 'poquito', texto: 'Un poquito (C$ 500 – C$ 2,000)', icono: '🙂' },
      { id: 'algo', texto: 'Algo (C$ 2,000 – C$ 5,000)', icono: '😊' },
      { id: 'bastante', texto: 'Bastante (más de C$ 5,000)', icono: '😄' }
    ]
  },

  // --- SECCIÓN B: Tu Situación Financiera Actual ---
  {
    id: 'B1',
    seccion: 'B',
    seccionTitulo: 'Tu Situación Financiera',
    pregunta: '¿Tienes cuenta activa en un banco o cooperativa?',
    descripcion: 'Queremos ver tu nivel de acceso al sistema financiero formal.',
    tipo: 'seleccion_unica',
    opciones: [
      { id: 'banco', texto: 'Sí, en un banco (BANPRO, BAC, BDF, LAFISE, Avanz...)', icono: '🏦' },
      { id: 'cooperativa', texto: 'Sí, en una cooperativa de ahorro y crédito', icono: '🤝' },
      { id: 'casa', texto: 'No, guardo todo el dinero en casa', icono: '🏠' },
      { id: 'quiero', texto: 'No tengo, pero me interesaría abrir una', icono: '🤔' }
    ]
  },
  {
    id: 'B2',
    seccion: 'B',
    seccionTitulo: 'Tu Situación Financiera',
    pregunta: '¿Tienes algún dinero ahorrado en este momento?',
    descripcion: 'Se refiere a ahorros acumulados, no al dinero corriente de la quincena.',
    tipo: 'seleccion_unica',
    opciones: [
      { id: 'nada', texto: 'No, no tengo ningún ahorro', icono: '❌' },
      { id: 'poquito', texto: 'Tengo algo guardado (menos de C$ 5,000)', icono: '🪙' },
      { id: 'algo', texto: 'Tengo ahorros (C$ 5,000 – C$ 20,000)', icono: '💰' },
      { id: 'bastante', texto: 'Sí, tengo bastante guardado (más de C$ 20,000)', icono: '🏦' }
    ]
  },
  {
    id: 'B3',
    seccion: 'B',
    seccionTitulo: 'Tu Situación Financiera',
    pregunta: '¿Tienes deudas o préstamos pendientes actualmente?',
    descripcion: 'Esto ayuda a balancear si conviene más pagar deudas o ahorrar.',
    tipo: 'seleccion_unica',
    opciones: [
      { id: 'ninguna', texto: 'No debo nada, estoy libre de deudas', icono: '✅' },
      { id: 'informal', texto: 'Le debo a familiares, vecinos o amigos', icono: '👥' },
      { id: 'formal', texto: 'Tengo un préstamo formal (banco, cooperativa, financiera)', icono: '🏦' },
      { id: 'varias', texto: 'Tengo varias deudas a la vez (tarjetas, préstamos, fiados)', icono: '⚠️' }
    ]
  },
  // --- SECCIÓN C: Tu Meta Principal ---
  {
    id: 'C1',
    seccion: 'C',
    seccionTitulo: 'Tu Meta Principal',
    pregunta: '¿Qué es lo más importante que deseas lograr con el dinero que te sobra?',
    descripcion: 'Con esto te damos un primer paso claro, no una lista enorme de tareas.',
    tipo: 'seleccion_unica',
    opciones: [
      { id: 'emergencias', texto: 'Tener un fondo seguro para emergencias familiares', icono: '🛡' },
      { id: 'meta_grande', texto: 'Ahorrar para algo grande (casa, educación, terreno)', icono: '🏠' },
      { id: 'hacer_crecer', texto: 'Hacer que mi dinero crezca solo con intereses', icono: '📈' },
      { id: 'negocio', texto: 'Invertir en hacer crecer o iniciar un negocio', icono: '🏪' }
    ]
  }
];
