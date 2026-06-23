import { estimarGastosMensuales } from '../utils/profiler';

/**
 * Genera una lista priorizada de recomendaciones financieras en base al perfil del usuario y sus respuestas.
 * @param {Object} profile - Perfil clasificado { id, nombre, ... }
 * @param {Object} answers - Respuestas del onboarding corto { A1, A2, A4, B1, B2, B3, C1 }
 * @returns {Array} Lista de recomendaciones ordenadas por prioridad
 */
export function generateRecommendations(profile, answers) {
  if (!profile || !answers) return [];

  const recs = [];

  // --- RECOMENDACIÓN 1: Sin cuenta bancaria o guardando dinero en casa (B1 === 'casa' o 'quiero') ---
  if (answers.B1 === 'casa' || answers.B1 === 'quiero') {
    recs.push({
      id: 'abrir_cuenta',
      prioridad: 1,
      icono: '🏦',
      titulo: 'Abre tu primera cuenta de ahorro o billetera móvil',
      resumen: 'Guardar el dinero en efectivo en casa representa riesgos de pérdida y devaluación. Una cuenta de ahorro formal o una billetera móvil te ofrece seguridad total, facilidad de pagos y acceso a más herramientas para progresar.',
      pasos: [
        'Elige un banco con comisiones bajas: BANPRO, BDF o Avanz ofrecen cuentas de ahorro básico en córdobas con mínimos de apertura muy bajos (C$ 100).',
        'Alternativa digital rápida: Abre una Billetera Móvil (como Billetera Móvil Banpro o Lafise Billetera) desde tu celular. No requieren saldo mínimo y puedes retirar efectivo en Agentes autorizados cerca de tu casa.',
        'Documentación: Solo necesitas llevar tu cédula de identidad vigente y tu número celular activo.',
        'Primer depósito: Empieza depositando una pequeña parte de tu remesa sobrante (ej. C$ 200) para activar el hábito.'
      ],
      modulo_sugerido: 'modulo_1',
      link_calculadora: 'comparador'
    });
  }

  // --- RECOMENDACIÓN 2: Sin ahorros o con ahorros muy bajos (B2 === 'nada' o 'poquito') ---
  if (answers.B2 === 'nada' || answers.B2 === 'poquito') {
    const gastosMensuales = estimarGastosMensuales(answers);
    const metaFondo = gastosMensuales * 3; // 3 meses de cobertura
    recs.push({
      id: 'fondo_emergencia',
      prioridad: 2,
      icono: '🛡️',
      titulo: 'Construye tu Escudo: El Fondo de Emergencia',
      resumen: `Tus gastos mensuales esenciales estimados son de aprox. C$ ${gastosMensuales.toLocaleString('es-NI')}. Tu meta es ahorrar C$ ${metaFondo.toLocaleString('es-NI')} (3 meses de gastos) para proteger a tu familia de imprevistos sin tener que endeudarte.`,
      pasos: [
        `Calcula tu gasto básico mensual (alimentación, agua, luz, pasajes).`,
        `Establece una meta de ahorro mensual de tu remesa: separar C$ 500 o C$ 1,000 en cuanto cobres.`,
        'Guarda este dinero en una cuenta bancaria separada o billetera móvil con alta liquidez (disponibilidad inmediata).',
        'Regla de oro: No toques este dinero a menos que sea una emergencia médica, desempleo o avería grave de trabajo.'
      ],
      modulo_sugerido: 'modulo_1',
      link_calculadora: 'fondo_emergencia'
    });
  }

  // --- RECOMENDACIÓN 3: Deudas informales, múltiples o costosas (B3 === 'informal' o 'varias') ---
  if (answers.B3 === 'informal' || answers.B3 === 'varias') {
    recs.push({
      id: 'manejar_deudas',
      prioridad: 3,
      icono: '⚖️',
      titulo: 'Ordena y liquida tus deudas rápidamente',
      resumen: 'Tener deudas acumuladas, especialmente con familiares o prestamistas informales, te quita liquidez y tranquilidad. Organizar los pagos con el "método bola de nieve" te permitirá liberar dinero para empezar a ahorrar.',
      pasos: [
        'Escribe en un papel todas tus deudas pendientes, indicando el monto total y a quién le debes.',
        'Págale a todos los mínimos posibles para mantener la palabra y no acumular multas.',
        'Si tienes deudas con interés, destina cualquier córdoba extra de tu remesa a abonar a la deuda que tenga el interés más alto (método avalancha) o a la de menor monto para salir rápido de ella (método bola de nieve).',
        'Una vez cancelada la primera deuda, usa el dinero que antes pagabas ahí para abonarlo a la siguiente en tu lista.'
      ],
      link_calculadora: 'deuda'
    });
  }

  // --- RECOMENDACIÓN 4: Tiene cuenta, ahorros listos, pero en cuentas con poco rendimiento (B1 === banco/coop y B2 === algo/bastante) ---
  if (
    (answers.B1 === 'banco' || answers.B1 === 'cooperativa') &&
    (answers.B2 === 'algo' || answers.B2 === 'bastante') &&
    answers.B3 !== 'varias'
  ) {
    recs.push({
      id: 'certificado_deposito',
      prioridad: 4,
      icono: '📄',
      titulo: 'Multiplica tus ahorros con un Depósito a Plazo Fijo',
      resumen: 'Mantener todos tus ahorros en una cuenta corriente o de ahorros básica te paga menos del 2% de interés anual. Un Certificado de Depósito a Plazo (CD) en Nicaragua te permite ganar hasta un 6.5% - 7.5% anual en córdobas de forma 100% segura.',
      pasos: [
        'Define un monto de dinero de tus ahorros que no vayas a necesitar en los próximos 6 o 12 meses (ejemplo: C$ 2,000 o C$ 5,000).',
        'Compara las tasas de plazos fijos: BANPRO, BAC y Avanz permiten aperturas de CD desde C$ 1,000 en córdobas de forma muy sencilla.',
        'Elige el plazo (3, 6, 12 meses) que mejor se adapte a tus planes futuros.',
        'Al vencimiento del plazo, reinvierte los intereses ganados junto con el capital (interés compuesto) para acelerar el crecimiento.'
      ],
      modulo_sugerido: 'modulo_2',
      link_calculadora: 'interes_compuesto'
    });
  }

  // --- RECOMENDACIÓN 5: Usuario con interés en emprendimiento o negocio ---
  if (answers.C1 === 'negocio') {
    recs.push({
      id: 'microempresa',
      prioridad: 5,
      icono: '🏪',
      titulo: 'Invierte tu remesa en emprendimiento de forma segura',
      resumen: 'Usar el dinero sobrante de las remesas para financiar mercadería, herramientas o infraestructura de tu negocio es una de las mejores formas de crear ingresos independientes. Las microfinancieras supervisadas por CONAMI te pueden dar financiamiento de trabajo.',
      pasos: [
        'Haz un presupuesto de inversión: escribe exactamente qué herramientas o mercadería necesitas y cuánto cuesta.',
        'Evita financiar inversiones de largo plazo (como maquinaria costosa) con deudas informales de corto plazo.',
        'Si necesitas un microcrédito, busca cooperativas o instituciones de microfinanzas supervisadas por CONAMI (como COOPEMUJER) que ofrezcan tasas reguladas y capacitación empresarial.',
        'Monitorea las ventas mensuales del negocio por separado de los gastos del hogar para asegurar la rentabilidad.'
      ],
      link_calculadora: 'deuda'
    });
  }

  // --- RECOMENDACIÓN 6: Perfil avanzado (Planificador o Inversionista) y sin deudas descontroladas -> Unirse a Cooperativas ---
  if (
    (profile.id === 'planificador' || profile.id === 'inversionista') &&
    answers.B3 !== 'varias'
  ) {
    recs.push({
      id: 'cooperativa_ahorro',
      prioridad: 6,
      icono: '🤝',
      titulo: 'Únete a una Cooperativa de Ahorro y Crédito',
      resumen: 'Las cooperativas en Nicaragua (como COOPEMUJER o cooperativas rurales afiliadas a FENACOOP) ofrecen tasas de rendimiento en ahorro superiores a la banca tradicional (hasta 5.5% anual) y tienen una filosofía de apoyo mutuo y desarrollo local.',
      pasos: [
        'Busca una cooperativa supervisada por CONAMI que tenga presencia en tu municipio o departamento.',
        'Solicita los requisitos de afiliación (generalmente cédula de identidad, solicitud firmada y un aporte social inicial de C$ 100 - C$ 200).',
        'Abre una cuenta de aportaciones o de ahorro programado.',
        'Aprovecha las tasas competitivas para créditos productivos si planeas expandir un negocio.'
      ],
      link_calculadora: 'comparador'
    });
  }

  // --- RECOMENDACIÓN 7: Optimización de Remesas Digitales (Aprobado por el usuario) ---
  if (answers.A1 === 'semana' || answers.A1 === 'quincena' || answers.B1 === 'casa') {
    recs.push({
      id: 'billeteras_digitales',
      prioridad: 7,
      icono: '📱',
      titulo: 'Usa Billeteras Digitales para ahorrar en comisiones y tiempo',
      resumen: 'Retirar remesas físicas en sucursales tradicionales consume tiempo en filas y a veces cargos de cobro. Las herramientas digitales nicaragüenses te permiten recibir, mover e incluso ahorrar dinero desde tu celular.',
      pasos: [
        'Utiliza la App Kash: Registra tu tarjeta de débito y haz transferencias instantáneas e inmediatas entre distintos bancos nacionales de Nicaragua utilizando Kashtags, sin costo o con tarifas mínimas.',
        'Activa Billetera Móvil Banpro o Lafise Billetera: Te permiten abonar las remesas directo a tu celular usando el código del envío (MTCN de Western Union u otras remesadoras).',
        'Usa el dinero digitalmente: Paga servicios públicos (agua, luz, recargas) directamente desde la app para evitar gastos de transporte y filas en ventanilla.',
        'Mantén un saldo flotante: Deja el 10% de tu remesa en la billetera móvil como un ahorro inmediato y seguro.'
      ],
      modulo_sugerido: 'modulo_2',
      link_calculadora: 'comparador'
    });
  }

  // Ordenar por prioridad numérica (1 es la máxima prioridad)
  return recs.sort((a, b) => a.prioridad - b.prioridad);
}
