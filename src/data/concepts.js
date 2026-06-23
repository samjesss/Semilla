/**
 * Glosario Financiero para la herramienta Semilla.
 * Contiene conceptos explicados en lenguaje llano, ejemplos del día a día en Nicaragua
 * y explicaciones técnicas opcionales.
 */
export const GLOSSARY = [
  {
    id: 'tasa_interes',
    termino: 'Tasa de interés',
    definicion_simple: 'El "precio" del dinero. Si pides prestado, la tasa es lo que pagas de más al banco por el préstamo. Si ahorras, es la ganancia que el banco te paga a ti por guardar tu dinero ahí.',
    definicion_tecnica: 'Porcentaje que representa el costo de un crédito o el rendimiento de un ahorro en un período de tiempo determinado, normalmente expresado de forma anual.',
    ejemplo: 'Si depositas C$ 10,000 en una cuenta de ahorro que te paga el 2.5% de interés anual, al finalizar el año habrás ganado C$ 250 solo por tener guardado tu dinero.',
    relacionados: ['interes_compuesto', 'certificado_deposito'],
    modulo: 'modulo_2'
  },
  {
    id: 'interes_compuesto',
    termino: 'Interés compuesto',
    definicion_simple: 'Es el interés que se calcula no solo sobre tu dinero original, sino también sobre los intereses que ya has ido ganando. Los intereses ganan intereses, lo que hace que tu dinero crezca más rápido con el tiempo.',
    definicion_tecnica: 'Efecto financiero donde los intereses devengados en cada período se reinvierten y se suman al capital inicial para generar nuevos intereses en el siguiente ciclo.',
    ejemplo: 'Si ahorras C$ 1,000 al 6% anual: el primer año ganas C$ 60 (tienes C$ 1,060). El segundo año, el 6% se calcula sobre C$ 1,060, por lo que ganas C$ 63.60 en lugar de C$ 60. Con el paso de los años, el dinero se multiplica como una bola de nieve.',
    dato_curiosidad: 'Albert Einstein solía decir que el interés compuesto es la octava maravilla del mundo, y que quien lo entiende lo gana, y quien no, lo paga.',
    modulo: 'modulo_2'
  },
  {
    id: 'certificado_deposito',
    termino: 'Certificado de Depósito a Plazo (CD)',
    definicion_simple: 'Es un contrato con el banco: te comprometes a dejar un monto fijo de dinero guardado por un tiempo definido (ej. 3, 6 o 12 meses) y el banco se compromete a pagarte un interés mucho más alto que el de una cuenta de ahorro normal.',
    definicion_tecnica: 'Instrumento financiero de ahorro a plazo fijo emitido por un banco regulado que devenga una tasa de interés fija superior a la cuenta a la vista a cambio de inmovilizar los fondos durante el plazo pactado.',
    ejemplo: 'Pones C$ 5,000 en un CD a 12 meses en BANPRO con una tasa del 6.5%. Al cabo del año, el banco te entrega tu dinero más C$ 325 de intereses. No podías retirar esos C$ 5,000 en el año, pero ganaste tres veces más que en la cuenta normal.',
    ventaja: 'Tasas de interés garantizadas y mucho más altas que las cuentas de ahorro tradicionales.',
    desventaja: 'No puedes retirar el dinero antes de tiempo. Si lo haces, te cobran una penalización o pierdes todos los intereses ganados.',
    modulo: 'modulo_2'
  },
  {
    id: 'inflacion',
    termino: 'Inflación',
    definicion_simple: 'Es cuando el costo de las cosas (comida, transporte, ropa) sube de forma generalizada con el tiempo. Como los precios suben, la misma cantidad de dinero te alcanza para comprar menos cosas.',
    definicion_tecnica: 'Proceso económico provocado por el desequilibrio existente entre la producción y la demanda, que causa una subida continuada de los precios de la mayor parte de los productos y servicios, y una pérdida del valor del dinero para poder adquirirlos.',
    ejemplo: 'Si la inflación en Nicaragua es del 5% anual, un saco de arroz que hoy cuesta C$ 1,000 costará C$ 1,050 el próximo año. Si guardaste C$ 1,000 en tu casa "bajo el colchón", al año siguiente sigues teniendo el billete de C$ 1,000, pero ya no puedes comprar el saco de arroz completo.',
    modulo: 'modulo_5'
  },
  {
    id: 'fondo_emergencia',
    termino: 'Fondo de emergencia',
    definicion_simple: 'Un "colchón" de dinero reservado única y exclusivamente para hacer frente a gastos imprevistos e inevitables, como emergencias médicas, reparaciones de la casa o si te quedas sin trabajo temporalmente.',
    meta_recomendada: 'Tener ahorrado una cantidad que cubra entre 3 y 6 meses de tus gastos básicos familiares.',
    donde_guardarlo: 'En un lugar seguro, de fácil acceso y con alta liquidez (por ejemplo, una cuenta de ahorro básica o billetera móvil), nunca en inversiones de plazo fijo o negocios de los que sea difícil retirar el dinero.',
    modulo: 'modulo_1'
  },
  {
    id: 'cooperativa',
    termino: 'Cooperativa de ahorro y crédito',
    definicion_simple: 'Una asociación de personas que se unen para ayudarse económicamente. Los socios depositan sus ahorros juntos y la cooperativa presta dinero a otros socios con condiciones más amigables y tasas de ahorro más atractivas que un banco.',
    definicion_tecnica: 'Sociedad cooperativa cuyo objeto social es servir a las necesidades financieras de sus miembros directos mediante la captación de depósitos y el otorgamiento de préstamos bajo principios de ayuda mutua.',
    ejemplo: 'Al afiliarte a COOPEMUJER, participas en asambleas, ahorras a una tasa del 5.5% (más del doble que en bancos) y si necesitas un crédito para tu pulpería, el proceso es más cercano y accesible.',
    modulo: 'modulo_3'
  },
  {
    id: 'liquidez',
    termino: 'Liquidez',
    definicion_simple: 'Es la facilidad y rapidez con la que puedes disponer de tu dinero en efectivo cuando lo necesites.',
    definicion_tecnica: 'Capacidad de un activo financiero de convertirse en dinero en efectivo de forma inmediata sin pérdida significativa de su valor.',
    ejemplo: 'El dinero en una cuenta de ahorros o billetera móvil tiene alta liquidez (vas al cajero y lo retiras ya). Un terreno, una casa o un Certificado de Depósito a 1 año tienen baja liquidez (vender la casa toma meses y el CD te obliga a esperar el año).',
    modulo: 'modulo_2'
  },
  {
    id: 'presupuesto',
    termino: 'Presupuesto familiar',
    definicion_simple: 'Un registro detallado de cuánto dinero ingresa a tu hogar (por remesas, salarios o ventas) y en qué se gasta exactamente cada mes. Te ayuda a controlar a dónde se va tu dinero y planificar el ahorro.',
    ejemplo: 'Hacer una lista: Ingresos (Remesa C$ 6,000) - Gastos (Comida C$ 3,000, Servicios C$ 1,000, Pasajes C$ 500, Ropa C$ 500). Esto te muestra que te sobran C$ 1,000 al mes que puedes ahorrar.',
    modulo: 'modulo_1'
  },
  {
    id: 'diversificacion',
    termino: 'Diversificación',
    definicion_simple: 'Como dice el refrán: "No pongas todos los huevos en la misma canasta". Consiste en repartir tu dinero en diferentes tipos de ahorro o inversiones para reducir el riesgo de perderlo todo si algo sale mal.',
    ejemplo: 'En lugar de guardar todo tu dinero sobrante en casa, dejas una parte en tu billetera móvil para gastos diarios, otra parte en una cuenta de ahorros bancaria para emergencias y abres un Certificado de Depósito en un banco o cooperativa para ganar intereses.',
    modulo: 'modulo_5'
  },
  {
    id: 'microcredito',
    termino: 'Microcrédito',
    definicion_simple: 'Pequeños préstamos de dinero dirigidos a personas que tienen un negocio pequeño (emprendedores, microempresarios) y que normalmente no cumplen con los requisitos rigurosos que piden los grandes bancos.',
    regulacion: 'En Nicaragua están regulados y supervisados por la Comisión Nacional de Microfinanzas (CONAMI) para evitar cobros abusivos.',
    ejemplo: 'Solicitas un microcrédito de C$ 8,000 en una cooperativa para comprar mercadería para tu pulpería y lo pagas en cuotas pequeñas semanales con las ganancias de tus ventas.',
    modulo: 'modulo_5'
  }
];

/**
 * Busca un término del glosario por su ID.
 * @param {string} id 
 * @returns {Object|undefined}
 */
export function getConceptById(id) {
  return GLOSSARY.find(c => c.id === id);
}
