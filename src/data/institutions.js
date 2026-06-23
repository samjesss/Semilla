/**
 * Datos de instituciones financieras y canales digitales de Nicaragua (Contexto 2026).
 * Tasas de interés referenciales y montos mínimos de apertura.
 */

export const BANCOS = [
  {
    id: 'banpro',
    nombre: 'BANPRO',
    nombreCompleto: 'Banco de la Producción S.A.',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://www.banpro.com.ni',
    telefono: '2255-9595',
    descripcion: 'El banco más grande de Nicaragua por red de sucursales y agentes Banpro.',
    productos: {
      cuenta_ahorro: {
        nombre: 'Cuenta de Ahorro Básica',
        monedas: ['NIO', 'USD'],
        tasaAnualNIO: 2.5,
        tasaAnualUSD: 1.2,
        minimoApertura: 100, // C$
        comisionMantenimiento: 0,
        liquidez: 'inmediata',
        descripcion: 'Ideal para iniciar. No requiere un saldo mensual mínimo elevado y puedes retirar en cualquier cajero o Agente Banpro.'
      },
      certificado_deposito: {
        nombre: 'Certificado de Depósito a Plazo',
        minimoCDNIO: 1000,
        liquidez: 'al_vencimiento',
        plazos: [
          { meses: 3, tasaNIO: 4.5, tasaUSD: 2.0 },
          { meses: 6, tasaNIO: 5.5, tasaUSD: 2.8 },
          { meses: 12, tasaNIO: 6.5, tasaUSD: 3.5 },
          { meses: 24, tasaNIO: 7.2, tasaUSD: 4.0 }
        ]
      }
    }
  },
  {
    id: 'bac',
    nombre: 'BAC Credomatic',
    nombreCompleto: 'Banco de América Central S.A.',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://www.baccredomatic.com/es-ni',
    telefono: '2274-4444',
    descripcion: 'Líder en banca digital y plataformas transaccionales móviles en Centroamérica.',
    productos: {
      cuenta_ahorro: {
        nombre: 'Cuenta de Ahorros Regular',
        monedas: ['NIO', 'USD'],
        tasaAnualNIO: 2.0,
        tasaAnualUSD: 1.0,
        minimoApertura: 500, // C$
        comisionMantenimiento: 0,
        liquidez: 'inmediata',
        descripcion: 'Cuenta estándar con excelente banca digital (Banca en Línea BAC).'
      },
      certificado_deposito: {
        nombre: 'Certificado de Depósito a Plazo',
        minimoCDNIO: 1000,
        liquidez: 'al_vencimiento',
        plazos: [
          { meses: 3, tasaNIO: 4.0, tasaUSD: 1.8 },
          { meses: 6, tasaNIO: 5.0, tasaUSD: 2.5 },
          { meses: 12, tasaNIO: 6.8, tasaUSD: 3.8 },
          { meses: 24, tasaNIO: 7.5, tasaUSD: 4.2 }
        ]
      }
    }
  },
  {
    id: 'lafise',
    nombre: 'LAFISE Bancentro',
    nombreCompleto: 'Banco de la Exportación S.A. LAFISE',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://www.lafise.com/bln',
    telefono: '2255-8888',
    descripcion: 'Fuerte presencia regional, muy enfocado en el pago de remesas internacionales.',
    productos: {
      cuenta_ahorro: {
        nombre: 'Cuenta Ahorro Remesas',
        monedas: ['NIO', 'USD'],
        tasaAnualNIO: 2.3,
        tasaAnualUSD: 1.1,
        minimoApertura: 300, // C$
        comisionMantenimiento: 0,
        liquidez: 'inmediata',
        descripcion: 'Diseñada especialmente para recibir y mantener remesas con cobros preferenciales.'
      },
      certificado_deposito: {
        nombre: 'Certificado de Depósito a Plazo',
        minimoCDNIO: 1000,
        liquidez: 'al_vencimiento',
        plazos: [
          { meses: 3, tasaNIO: 4.2, tasaUSD: 1.9 },
          { meses: 6, tasaNIO: 5.2, tasaUSD: 2.6 },
          { meses: 12, tasaNIO: 6.0, tasaUSD: 3.2 },
          { meses: 24, tasaNIO: 7.0, tasaUSD: 3.8 }
        ]
      }
    }
  },
  {
    id: 'bdf',
    nombre: 'BDF',
    nombreCompleto: 'Banco de Finanzas S.A.',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://www.bdf.com.ni',
    telefono: '2248-8181',
    descripcion: 'Banco con fuerte enfoque en financiamiento de vivienda y ahorro programado.',
    productos: {
      cuenta_ahorro: {
        nombre: 'Cuenta de Ahorro Clásica',
        monedas: ['NIO', 'USD'],
        tasaAnualNIO: 2.2,
        tasaAnualUSD: 1.0,
        minimoApertura: 200, // C$
        comisionMantenimiento: 0,
        liquidez: 'inmediata',
        descripcion: 'Cuenta con planes de ahorro mensual programado de forma automática.'
      },
      certificado_deposito: {
        nombre: 'Certificado de Depósito BDF',
        minimoCDNIO: 1000,
        liquidez: 'al_vencimiento',
        plazos: [
          { meses: 3, tasaNIO: 4.1, tasaUSD: 1.8 },
          { meses: 6, tasaNIO: 5.2, tasaUSD: 2.6 },
          { meses: 12, tasaNIO: 6.3, tasaUSD: 3.5 }
        ]
      }
    }
  },
  {
    id: 'avanz',
    nombre: 'Avanz',
    nombreCompleto: 'Avanz Nicaragua',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://www.avanz.com.ni',
    telefono: '2223-7676',
    descripcion: 'Banco del grupo Pellas, enfocado en atención personalizada y agilidad digital.',
    productos: {
      cuenta_ahorro: {
        nombre: 'Cuenta Avanza Ahorro',
        monedas: ['NIO', 'USD'],
        tasaAnualNIO: 2.5,
        tasaAnualUSD: 1.2,
        minimoApertura: 100, // C$
        comisionMantenimiento: 0,
        liquidez: 'inmediata',
        descripcion: 'Tasas de ahorro competitivas en el mercado desde montos bajos.'
      },
      certificado_deposito: {
        nombre: 'Certificado de Depósito Plazo Fijo',
        minimoCDNIO: 1000,
        liquidez: 'al_vencimiento',
        plazos: [
          { meses: 6, tasaNIO: 5.0, tasaUSD: 2.5 },
          { meses: 12, tasaNIO: 6.5, tasaUSD: 3.5 }
        ]
      }
    }
  }
];

export const COOPERATIVAS = [
  {
    id: 'coopemujer',
    nombre: 'COOPEMUJER R.L.',
    nombreCompleto: 'Cooperativa de Ahorro y Crédito de Mujeres Emprendedoras',
    tipo: 'cooperativa',
    regulador: 'CONAMI / INFOCOOP',
    website: 'http://www.coopemujer.com.ni',
    enfoque: 'Mujeres emprendedoras, dueñas de pulperías, negocios familiares y jefas de hogar.',
    tasaAhorro: 5.5, // Tasa de ahorro anual promedio para socios
    tasaCreditoMinima: 18.0, // Interés anual aproximado en microcrédito
    requisitos: [
      'Ser mujer nicaragüense mayor de 18 años.',
      'Cédula de identidad vigente.',
      'Llenar solicitud de membresía y abonar aporte de admisión (aprox. C$ 150 - C$ 200).'
    ],
    ventaja: 'Ofrece tasas de ahorro mucho más altas que los bancos comerciales y acompañamiento/capacitación.',
    desventaja: 'Liquidez programada (los retiros grandes requieren aviso o se gestionan mensualmente).'
  },
  {
    id: 'fenacoop',
    nombre: 'FENACOOP R.L.',
    nombreCompleto: 'Federación Nacional de Cooperativas Agropecuarias y de Servicios R.L.',
    tipo: 'red_cooperativas',
    regulador: 'CONAMI',
    website: 'https://www.fenacoop.org.ni',
    enfoque: 'Productores rurales, cooperativas de ahorro y crédito comunitarias.',
    descripcion: 'Agrupa a decenas de cooperativas de ahorro y crédito locales, especialmente en departamentos (Matagalpa, Estelí, León, etc.). Las tasas varían según la cooperativa base de la red (promedio 5.0% - 6.0% anual en ahorros).'
  }
];

export const BILLETERAS_MOVILES = [
  {
    id: 'billetera_banpro',
    nombre: 'Billetera Móvil Banpro',
    tipo: 'billetera_digital',
    proveedor: 'BANPRO',
    regulador: 'SIBOIF',
    requisitos: [
      'Celular (no requiere smartphone obligatorio, funciona también vía USSD *155#).',
      'Número de cédula de identidad nicaragüense.',
      'Número telefónico activo.'
    ],
    ventajas: [
      'No exige saldo mínimo de apertura.',
      'Retiros gratis o de bajísimo costo en cualquier Agente Banpro.',
      'Permite recibir remesas directamente en la billetera ingresando el código del envío.'
    ],
    descripcion: 'Excelente para quienes viven en zonas rurales donde no hay sucursales bancarias, pero sí hay Agentes Banpro (pulperías o farmacias afiliadas).'
  },
  {
    id: 'kash',
    nombre: 'Kash Nicaragua',
    tipo: 'billetera_digital',
    proveedor: 'Namutek / BAC Credomatic',
    regulador: 'Transaccional (respaldado por tarjetas Visa/Mastercard de bancos locales)',
    requisitos: [
      'Smartphone con la App Kash instalada.',
      'Tener una tarjeta de débito de cualquier banco de Nicaragua.',
      'Registro con cédula de identidad.'
    ],
    ventajas: [
      'Transferencias instantáneas entre tarjetas de distintos bancos las 24 horas del día.',
      'No se necesita digitar números de cuenta largos, solo el "Kashtag" del usuario.',
      'Ideal para mover dinero de remesas de una tarjeta a otra de forma barata.'
    ],
    descripcion: 'Una de las herramientas de transferencia más rápidas y populares en Nicaragua para evitar ir al banco a depositar en ventanilla.'
  },
  {
    id: 'billetera_lafise',
    nombre: 'Lafise Billetera',
    tipo: 'billetera_digital',
    proveedor: 'LAFISE',
    regulador: 'SIBOIF',
    requisitos: [
      'Smartphone con acceso a internet.',
      'Cédula de identidad nicaragüense.',
      'Descargar la App de Billetera LAFISE.'
    ],
    ventajas: [
      'Cobro directo de remesas enviadas por remesadoras afiliadas sin hacer fila.',
      'Pagos de servicios básicos (luz, agua, internet) sin salir de casa.',
      'Retiros sin tarjeta en cajeros LAFISE.'
    ],
    descripcion: 'Muy útil si recibes remesas de manera constante y deseas pagar tus cuentas mensuales y retirar efectivo sin cargos extra.'
  }
];

// Datos del regulador
export const REGULADORES = {
  SIBOIF: {
    nombre: 'Superintendencia de Bancos y de Otras Instituciones Financieras',
    website: 'https://www.siboif.gob.ni',
    descripcion: 'Ente del gobierno que supervisa y garantiza la seguridad de tus ahorros en los bancos comerciales de Nicaragua.'
  },
  CONAMI: {
    nombre: 'Comisión Nacional de Microfinanzas',
    website: 'https://www.conami.gob.ni',
    descripcion: 'Regula y supervisa a las microfinancieras y cooperativas de ahorro que otorgan microcréditos, garantizando tasas justas y transparencia.'
  }
};
