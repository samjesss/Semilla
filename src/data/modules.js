/**
 * Módulos Educativos de Semilla.
 * Contiene lecciones, contenido formateado, enlaces a calculadoras, cuestionarios y badges asociados.
 */

import { BADGES } from './badges';

export const MODULES = [
  {
    id: 'modulo_1',
    titulo: 'Ordena tu Dinero',
    subtitulo: 'El primer paso para alcanzar tus metas financieras',
    estado: 'publicado',
    nivel: 'Básico',
    emoji: '📋',
    color: '#16A34A', // Verde
    duracion: '15 min',
    perfiles: ['principiante', 'guardador'],
    lecciones: [
      {
        id: 'l1_1',
        titulo: '¿Por qué a veces el dinero "se esfuma"?',
        duracion: '3 min',
        contenido: {
          intro: '¿Te ha pasado que recibes la remesa y a los pocos días miras la cartera y ya casi no te queda nada? No te preocupes, no eres la única persona. Esto pasa principalmente porque gastamos sin tener un plan visual.',
          secciones: [
            {
              titulo: 'Los gastos hormiga',
              texto: 'A veces pensamos que la remesa se nos va en cosas grandes, pero la realidad es que a menudo se consume en compras pequeñitas y diarias que parecen inofensivas. En Nicaragua, el cafecito de la tarde, la recarga de celular diaria para ver redes sociales, o el refresco helado en la pulpería pueden sumar más de C$ 1,500 al mes sin darnos cuenta.',
              lista: [
                'Una recarga de C$ 50 diaria = C$ 1,500 al mes.',
                'Una gaseosa de C$ 25 al día = C$ 750 al mes.',
                'Un antojito por la tarde de C$ 40 al día = C$ 1,200 al mes.'
              ]
            },
            {
              titulo: '¿Qué podemos hacer?',
              texto: 'No se trata de no darse gustos, sino de ser conscientes. Si anotas lo que gastas durante una semana, verás con claridad a dónde se escapa tu dinero y podrás decidir qué gastos recortar para empezar a ahorrar.'
            }
          ],
          conclusion: 'El primer paso para ordenar tu dinero no es ganar más, sino controlar lo que ya tienes. ¡Continuemos para ver una regla muy simple para lograrlo!'
        }
      },
      {
        id: 'l1_2',
        titulo: 'La Regla del 50/30/20: Simple y Efectiva',
        duracion: '4 min',
        calculadora: 'presupuesto',
        contenido: {
          intro: 'Organizar el presupuesto no tiene que ser aburrido ni requerir matemáticas avanzadas. La regla del 50/30/20 es una fórmula muy sencilla recomendada por expertos para dividir tu dinero de forma inteligente.',
          secciones: [
            {
              titulo: '¿En qué consiste la regla?',
              texto: 'De cada córdoba que recibes de tu remesa o ingresos, divídelo en tres grupos:',
              lista: [
                '50% para tus NECESIDADES: Comida para el hogar, recibos de agua y luz, transporte, alquiler o pago de casa, y medicinas. Cosas sin las cuales no puedes pasar el mes.',
                '30% para tus DESEOS: Cosas que quieres pero no son obligatorias. Salidas familiares, estrenos de ropa, suscripciones, visitas a la pulpería o paseos.',
                '20% para tu AHORRO: Guardar dinero para tu fondo de emergencias, para invertir en tu negocio o depositar en un plazo fijo para ganar intereses.'
              ]
            },
            {
              titulo: 'Ejemplo real con una remesa de C$ 6,000 al mes:',
              texto: 'Mira cómo se dividiría el dinero aplicando la regla:',
              tabla: [
                { categoria: 'Necesidades (50%)', monto: 'C$ 3,000', ejemplos: 'Arroz, frijoles, pago de luz, pasajes' },
                { categoria: 'Deseos (30%)', monto: 'C$ 1,800', ejemplos: 'Estreno, salida al parque, antojitos' },
                { categoria: 'Ahorro (20%)', monto: 'C$ 1,200', ejemplos: 'Guardado seguro en banco o cooperativa' }
              ]
            },
            {
              titulo: '¿Y si no me sobra el 20%?',
              texto: '¡No te estreses! Si tus necesidades consumen más del 50% debido al costo de la vida actual, empieza apartando el 5% o el 10% para tu ahorro. Lo importante es crear el hábito de separar el dinero del ahorro PRIMERO, antes de empezar a gastar en los deseos.'
            }
          ],
          conclusion: 'Esta división le da un propósito a cada córdoba. Puedes usar la calculadora de presupuesto que está aquí abajo para simular tu propio 50/30/20.',
          cta_calculadora: 'Ir a calculadora de presupuesto'
        }
      },
      {
        id: 'l1_3',
        titulo: 'Tu Fondo de Emergencia: Tu Escudo Protector',
        duracion: '4 min',
        calculadora: 'fondo_emergencia',
        contenido: {
          intro: 'La vida está llena de sorpresas, y no todas son buenas. Una enfermedad familiar, la moto rota con la que trabajas, o un daño en el techo de la casa por las lluvias en invierno. Si no tienes ahorros, tendrás que pedir prestado con intereses altos.',
          secciones: [
            {
              titulo: '¿Qué es el fondo de emergencia?',
              texto: 'Es un colchón de dinero ahorrado que se usa únicamente cuando pasa un imprevisto real. No se toca para compras ordinarias ni deseos.',
              lista: [
                'Meta ideal: Ahorrar entre 3 y 6 meses de tus gastos básicos de comida y servicios.',
                'Ejemplo: Si tu familia gasta C$ 4,000 en necesidades al mes, tu escudo mínimo de emergencias debería ser de C$ 12,000.',
                '¿Dónde guardarlo? En una cuenta bancaria básica o billetera móvil que te deje sacar el dinero de inmediato si hay una urgencia (alta liquidez).'
              ]
            },
            {
              titulo: 'Cómo construirlo paso a paso:',
              texto: 'No tienes que juntar todo el dinero de una sola vez. Cada vez que cobres la remesa, separa una porción fija (por ejemplo, C$ 300 o C$ 500) y ponla en esa cuenta separada. En pocos meses verás cómo tu "escudo" va creciendo.'
            }
          ],
          conclusion: 'Tener un fondo de emergencia te da tranquilidad mental. Sabes que si algo pasa, no tendrás que endeudarte con prestamistas informales que cobran tasas abusivas.',
          cta_calculadora: 'Calcular mi fondo de emergencia'
        }
      },
      {
        id: 'l1_4',
        titulo: 'Por qué "guardar bajo el colchón" te cuesta dinero',
        duracion: '4 min',
        contenido: {
          intro: 'Es muy común en Nicaragua guardar el dinero en casa: en un ropero, debajo de un colchón o en una alcancía. Parece lo más seguro porque lo tienes cerca, pero en realidad estás perdiendo dinero día con día.',
          secciones: [
            {
              titulo: 'Los dos grandes riesgos de ahorrar en casa',
              texto: 'Ahorrar de forma informal expone tus remesas a dos peligros silenciosos:',
              lista: [
                '1. La tentación constante: Si el dinero físico está en casa, es muy fácil gastarlo en deseos rápidos o prestárselo a un familiar que difícilmente lo devolverá.',
                '2. La inflación: Los precios de los alimentos suben cada año. Un billete de C$ 1,000 guardado en el ropero hoy seguirá siendo el mismo billete en un año, pero comprará menos comida porque las cosas se habrán encarecido.'
              ]
            },
            {
              titulo: 'La alternativa segura',
              texto: 'Tener una cuenta de ahorros básica en un banco (como BANPRO o BAC) o en una cooperativa local resguarda tu dinero físicamente y además te paga pequeños intereses que ayudan a amortiguar el alza de precios.'
            }
          ],
          conclusion: 'El dinero en casa se devalúa y es fácil de gastar. Dar el salto a una cuenta formal es el inicio de la verdadera salud financiera.'
        }
      }
    ],
    quiz: [
      {
        id: 'q1_1',
        pregunta: 'Según la regla del 50/30/20, ¿qué porcentaje de tus ingresos se aconseja destinar al ahorro?',
        opciones: ['El 50%', 'El 30%', 'El 20%', 'El 10%'],
        respuestaCorrecta: 2, // 'El 20%'
        explicacion: 'La regla sugiere el 20% para ahorro. No obstante, si estás empezando, cualquier porcentaje menor es un excelente inicio.'
      },
      {
        id: 'q1_2',
        pregunta: '¿Cuál es la función principal de un "Fondo de Emergencia"?',
        opciones: [
          'Tener dinero para ir de paseo o comprar regalos',
          'Comprar mercadería para iniciar un negocio',
          'Cubrir gastos imprevistos de urgencia sin tener que endeudarse',
          'Comprar un celular nuevo cuando salga el último modelo'
        ],
        respuestaCorrecta: 2,
        explicacion: 'El fondo de emergencia actúa como escudo ante incidentes de salud o reparaciones imprevistas, protegiendo tu economía familiar.'
      },
      {
        id: 'q1_3',
        pregunta: '¿Cuál es el principal enemigo del dinero guardado en casa "bajo el colchón"?',
        opciones: [
          'La inflación (pérdida de valor de compra al subir los precios)',
          'El cobro de comisiones del banco',
          'Que el Banco Central cambie el diseño del billete',
          'Es ilegal tener dinero en efectivo'
        ],
        respuestaCorrecta: 0,
        explicacion: 'La inflación hace que los precios suban y tu dinero guardado en casa compre cada vez menos cosas.'
      }
    ],
    badge: BADGES.badge_organizador
  },

  {
    id: 'modulo_2',
    titulo: 'Haz Que Tu Dinero Trabaje',
    subtitulo: 'Aprende a multiplicar tus ahorros con el Interés Compuesto',
    estado: 'publicado',
    nivel: 'Básico - Intermedio',
    emoji: '💰',
    color: '#2563EB', // Azul
    duracion: '20 min',
    perfiles: ['guardador', 'planificador'],
    lecciones: [
      {
        id: 'l2_1',
        titulo: 'El Interés: Tu aliado silencioso',
        duracion: '5 min',
        contenido: {
          intro: 'En el módulo anterior vimos que la inflación devalúa el dinero guardado en casa. En esta lección aprenderás cómo el sistema bancario te recompensa con intereses por tener tus ahorros con ellos.',
          secciones: [
            {
              titulo: '¿Qué es el interés de ahorro?',
              texto: 'Cuando depositas dinero en un banco o cooperativa, en realidad les estás prestando tu dinero para que ellos financien a otras personas. A cambio, la institución te paga una renta mensual llamada interés.',
              lista: [
                'Interés Simple: Si depositas C$ 1,000 al 3% anual, ganas C$ 30 de intereses cada año de forma fija.',
                'Interés Compuesto: Es cuando dejas los C$ 30 acumulados en la cuenta. El siguiente año, el 3% se calcula sobre C$ 1,030. ¡Tus ganancias también ganan intereses!'
              ]
            },
            {
              titulo: 'La fuerza del tiempo',
              texto: 'Al principio la diferencia parece pequeña, pero a lo largo de 5 o 10 años, el interés compuesto acelera enormemente el crecimiento de tu saldo. Es la herramienta principal para construir un patrimonio a largo plazo.'
            }
          ],
          conclusion: 'El interés compuesto premia la paciencia. Cuanto antes empieces a ahorrar de forma formal, más provecho le sacarás a esta octava maravilla financiera.'
        }
      },
      {
        id: 'l2_2',
        titulo: 'Cuentas de Ahorro en Nicaragua: Cómo comparar',
        duracion: '5 min',
        calculadora: 'comparador',
        contenido: {
          intro: 'Casi todos los bancos en Nicaragua te ofrecen una cuenta de ahorro. Sin embargo, no todas son iguales. Hay factores muy importantes que debes revisar antes de firmar.',
          secciones: [
            {
              titulo: 'Puntos clave a comparar:',
              texto: 'Cuando vayas a abrir una cuenta, haz las siguientes preguntas en ventanilla o revisa su sitio web:',
              lista: [
                'Monto mínimo de apertura: Algunos bancos te dejan abrir cuentas desde C$ 100 (como BANPRO o Avanz) o $10 en dólares. Otros te piden C$ 500 o C$ 1,000.',
                'Comisión por saldo mínimo: Muchos bancos te cobran una penalización de C$ 50 o C$ 100 mensuales si el saldo de tu cuenta baja de cierto límite. Busca cuentas con "Mantenimiento gratis" o "Saldo mínimo cero".',
                'Tasa de interés anual (tasa pasiva): Las cuentas normales pagan poco (entre 1.5% y 2.5% anual en córdobas). Las cuentas digitales o cuentas de ahorro a plazo pagan más.'
              ]
            },
            {
              titulo: 'Seguridad regulada',
              texto: 'Todos los bancos comerciales en Nicaragua (BANPRO, BAC, BDF, LAFISE, Avanz) están supervisados por la SIBOIF. Tus depósitos están protegidos por el Estado (a través del FOGADE) hasta por un equivalente a $12,000 en caso de que el banco quiebre.'
            }
          ],
          conclusion: 'No te quedes con el primer banco que veas. Compara montos mínimos y comisiones para no perder dinero en cobros administrativos.',
          cta_calculadora: 'Comparar cuentas de ahorro'
        }
      },
      {
        id: 'l2_3',
        titulo: 'Certificados de Depósito (CD): Ahorro bajo llave',
        duracion: '5 min',
        calculadora: 'interes_compuesto',
        contenido: {
          intro: 'Si ya tienes un fondo de emergencias listo y tienes un dinero ahorrado que sabes que no vas a necesitar en los próximos 6 meses o 1 año, una cuenta de ahorros normal se queda corta. Es hora de conocer los Certificados de Depósito a Plazo (CD).',
          secciones: [
            {
              titulo: '¿Cómo funciona un Certificado de Depósito?',
              texto: 'Es un depósito a plazo fijo. Pactas con el banco dejar guardado un monto (ejemplo: C$ 5,000) por un tiempo determinado (3 meses, 6 meses, 12 meses o más).',
              lista: [
                'A cambio del compromiso de no tocar el dinero, el banco te paga una tasa mucho más alta (ejemplo: hasta 6.5% o 7.0% anual en córdobas).',
                'Si retiras el dinero antes de que termine el plazo, tendrás una penalización severa y perderás las ganancias de interés.',
                'Al final del plazo, el banco te devuelve el capital inicial más todos los intereses acumulados.'
              ]
            },
            {
              titulo: '¿Por qué sirve para la remesa?',
              texto: 'Si recibes dinero para comprar un terreno o construir tu casa en el futuro, dejarlo en un CD a 12 meses evita que te lo gastes en deseos cotidianos y te genera un rendimiento importante de forma totalmente segura.'
            }
          ],
          conclusion: 'El CD es una de las inversiones más seguras de Nicaragua. Poner tu dinero "bajo llave" voluntariamente es una estrategia ganadora para metas medianas.',
          cta_calculadora: 'Simular depósito a plazo fijo'
        }
      },
      {
        id: 'l2_4',
        titulo: 'La regla de oro: Págate a ti mismo primero',
        duracion: '5 min',
        contenido: {
          intro: 'La mayoría de la gente tiene la costumbre de ahorrar lo que "sobra" al final del mes. El problema es que casi nunca sobra nada. La verdadera regla de oro del ahorro consiste en cambiar el orden de las cosas.',
          secciones: [
            {
              titulo: 'Fórmula tradicional vs. Fórmula del ahorrador',
              texto: 'Compara estas dos formas de ver tus ingresos mensuales:',
              lista: [
                '❌ Tradicional: Ingreso - Gasto = Ahorro (Ahorras lo que sobre, si es que sobra).',
                '✅ Ahorrador: Ingreso - Ahorro = Gasto (Apartas tu ahorro el primer día, y vives con el resto).'
              ]
            },
            {
              titulo: 'Ahorro automático',
              texto: 'Apenas retires tu remesa, aparta inmediatamente tu meta de ahorro (el 10% o 20%) y deposítala en tu cuenta de ahorros, cooperativa o pásala a tu billetera móvil de ahorro. Adáptate a pasar la quincena con lo restante. Te sorprenderá ver cómo tu cerebro se acomoda al presupuesto disponible sin sufrir.'
            }
          ],
          conclusion: 'Págate a ti mismo primero. Tu "yo" del futuro te lo agradecerá enormemente cuando veas tus metas cumplidas.'
        }
      }
    ],
    quiz: [
      {
        id: 'q2_1',
        pregunta: '¿Cuál es la diferencia clave entre el interés simple y el interés compuesto?',
        opciones: [
          'El interés simple es ilegal y el compuesto es legal',
          'En el interés compuesto, las ganancias acumuladas se reinvierten para generar nuevos intereses',
          'El interés simple solo se paga en dólares y el compuesto en córdobas',
          'No hay ninguna diferencia, son nombres comerciales del banco'
        ],
        respuestaCorrecta: 1,
        explicacion: 'En el interés compuesto, los intereses ganados se suman al capital inicial mes a mes o año a año, multiplicando el crecimiento del saldo.'
      },
      {
        id: 'q2_2',
        pregunta: '¿Qué sucede si retiras el dinero de un Certificado de Depósito a Plazo (CD) antes de la fecha acordada?',
        opciones: [
          'Te regalan un bono de intereses adicional por retirar antes',
          'El banco te embarga tu cédula de identidad',
          'No pasa nada, puedes disponer de tu dinero sin ninguna limitación',
          'Te cobran una penalización y puedes perder los intereses que habías acumulado'
        ],
        respuestaCorrecta: 3,
        explicacion: 'Un CD exige dejar el dinero inmovilizado. Si lo retiras antes, incumples el plazo y pierdes rendimientos debido a penalizaciones.'
      },
      {
        id: 'q2_3',
        pregunta: '¿Cuál es la garantía máxima de tus ahorros en un banco supervisado de Nicaragua en caso de quiebra?',
        opciones: [
          'Hasta un equivalente de $12,000 USD respaldado por FOGADE',
          'No hay ninguna garantía, el dinero se pierde en su totalidad',
          'El Estado te devuelve la mitad de lo que tenías',
          'Te entregan acciones del banco'
        ],
        respuestaCorrecta: 0,
        explicacion: 'El FOGADE protege los depósitos en bancos regulados por la SIBOIF en Nicaragua hasta por un monto de $12,000 USD por persona e institución.'
      }
    ],
    badge: BADGES.badge_ahorrista
  },

  {
    id: 'modulo_3',
    titulo: 'Cooperativas: El Poder de lo Colectivo',
    subtitulo: 'Una gran alternativa a los bancos que muchos nicaragüenses desconocen',
    estado: 'proximamente',
    nivel: 'Intermedio',
    emoji: '🤝',
    color: '#7C3AED', // Morado
    duracion: '15 min',
    perfiles: ['planificador', 'inversionista'],
    lecciones: [
      { id: 'l3_1', titulo: '¿Qué es una cooperativa de ahorro y crédito?' },
      { id: 'l3_2', titulo: 'Bancos vs Cooperativas en Nicaragua: ¿Cuál te conviene?' },
      { id: 'l3_3', titulo: 'Cómo unirte: Requisitos y pasos concretos en Nicaragua' }
    ],
    quiz: [],
    badge: BADGES.badge_solidario
  },

  {
    id: 'modulo_4',
    titulo: 'Entiende el Crédito',
    subtitulo: 'La deuda como una herramienta de doble filo para tu economía',
    estado: 'proximamente',
    nivel: 'Intermedio',
    emoji: '⚖️',
    color: '#DC2626', // Rojo
    duracion: '20 min',
    perfiles: ['guardador', 'planificador', 'inversionista'],
    lecciones: [
      { id: 'l4_1', titulo: 'Deuda buena vs. deuda mala: ¿Cómo diferenciarlas?' },
      { id: 'l4_2', titulo: 'Cómo comparar tasas de préstamos formal e informal' },
      { id: 'l4_3', titulo: 'Estrategias efectivas para salir de deudas: Avalancha y Bola de Nieve' }
    ],
    quiz: [],
    badge: BADGES.badge_credito
  },

  {
    id: 'modulo_5',
    titulo: 'Piensa en tu Futuro',
    subtitulo: 'Construye riqueza e invierte en Nicaragua a largo plazo',
    estado: 'proximamente',
    nivel: 'Avanzado',
    emoji: '🔭',
    color: '#EA580C', // Naranja
    duracion: '25 min',
    perfiles: ['planificador', 'inversionista'],
    lecciones: [
      { id: 'l5_1', titulo: 'La Inflación y la devaluación: ¿Cómo ganarle la carrera en 2026?' },
      { id: 'l5_2', titulo: 'La regla de oro: Diversifica tus ahorros' },
      { id: 'l5_3', titulo: 'Microcréditos supervisados por CONAMI para tu emprendimiento' }
    ],
    quiz: [],
    badge: BADGES.badge_visionario
  }
];

/**
 * Retorna la lista de módulos educativos publicados.
 * @returns {Array}
 */
export function getModules({ includeUpcoming = false } = {}) {
  if (includeUpcoming) return MODULES;
  return MODULES.filter(m => m.estado === 'publicado');
}

/**
 * Retorna un módulo por su ID.
 * @param {string} id 
 * @returns {Object|undefined}
 */
export function getModuleById(id) {
  return MODULES.find(m => m.id === id);
}
