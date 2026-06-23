import { PROFILES } from '../data/profiles';
import { TASA_CAMBIO } from './currency';

/**
 * Clasifica al usuario en uno de los 4 perfiles según sus respuestas del quiz.
 * @param {Object} answers - Respuestas del onboarding corto { A1, A2, A4, B1, B2, B3, C1 }
 * @returns {Object} Perfil clasificado
 */
export function classifyProfile(answers) {
  if (!answers) return PROFILES.principiante;

  let score = 0;

  // 1. Puntos por cantidad de dinero sobrante (A4)
  if (answers.A4 === 'poquito') score += 1;
  if (answers.A4 === 'algo') score += 2;
  if (answers.A4 === 'bastante') score += 4;

  // 2. Puntos por bancarización (B1)
  if (answers.B1 === 'banco') score += 3;
  if (answers.B1 === 'cooperativa') score += 2;

  // 3. Puntos por ahorro existente (B2)
  if (answers.B2 === 'poquito') score += 1;
  if (answers.B2 === 'algo') score += 2;
  if (answers.B2 === 'bastante') score += 4;

  // 4. Penalización o bonus por deudas (B3)
  if (answers.B3 === 'varias') score -= 2; // Penaliza deudas desordenadas
  if (answers.B3 === 'formal') score += 1;  // Acceso formal a crédito es positivo si es controlado

  // 5. Puntos por meta principal (C1)
  if (answers.C1 === 'hacer_crecer') score += 2;
  if (answers.C1 === 'meta_grande') score += 1;
  if (answers.C1 === 'negocio') score += 2;

  // Clasificación final en base a la puntuación acumulada
  if (score <= 4) return PROFILES.principiante;
  if (score <= 9) return PROFILES.guardador;
  if (score <= 14) return PROFILES.planificador;
  return PROFILES.inversionista;
}

/**
 * Estima los gastos mensuales esenciales del usuario en base a su remesa y número de personas en el hogar.
 * @param {Object} answers 
 * @returns {number} Monto en Córdobas
 */
export function estimarGastosMensuales(answers) {
  if (!answers) return 4000; // Valor por defecto razonable

  // Mapear monto promedio de remesa (USD)
  const remesaMap = {
    menos100: 75,
    cien200: 150,
    dos400: 300,
    mas400: 500
  };
  const remesaUSD = remesaMap[answers.A2] || 150;
  const remesaNIO = remesaUSD * TASA_CAMBIO.USD_TO_NIO;

  // Estimado base: el 70% de la remesa se destina a cubrir necesidades del hogar
  let factorGastos = 0.7;

  // El diagnóstico corto ya no pregunta tamaño del hogar.
  // Ajustamos con el sobrante declarado para conservar una estimación prudente.
  if (answers.A4 === 'nada') factorGastos = 0.9;
  if (answers.A4 === 'poquito') factorGastos = 0.75;
  if (answers.A4 === 'algo') factorGastos = 0.6;
  if (answers.A4 === 'bastante') factorGastos = 0.5;

  return Math.round(remesaNIO * factorGastos);
}

/**
 * Obtiene la remesa estimada mensual en córdobas.
 * @param {Object} answers 
 * @returns {number}
 */
export function estimarRemesaMensualNIO(answers) {
  if (!answers) return 0;
  const remesaMap = {
    menos100: 75,
    cien200: 150,
    dos400: 300,
    mas400: 500
  };
  const remesaUSD = remesaMap[answers.A2] || 150;
  
  // Frecuencia de remesa (A1)
  let factorFrecuencia = 1; // mensual
  if (answers.A1 === 'semana') factorFrecuencia = 4;
  if (answers.A1 === 'quincena') factorFrecuencia = 2;
  if (answers.A1 === 'ocasional') factorFrecuencia = 0.7; // Asumimos menos de una al mes en promedio

  return Math.round(remesaUSD * TASA_CAMBIO.USD_TO_NIO * factorFrecuencia);
}

/**
 * Obtiene el sobrante estimado mensual en córdobas a partir del quiz.
 * @param {Object} answers 
 * @returns {number}
 */
export function estimarSobranteMensualNIO(answers) {
  if (!answers) return 0;
  const sobranteMap = {
    nada: 300,
    poquito: 1250,
    algo: 3500,
    bastante: 6000
  };
  return sobranteMap[answers.A4] || 1000;
}

/**
 * Genera el resumen del perfil del usuario para guardar en Zustand.
 * @param {Object} answers 
 * @returns {Object} Información del usuario parseada
 */
export function extractUserInfo(answers) {
  if (!answers) return {};
  
  const remesaMensualNIO = estimarRemesaMensualNIO(answers);
  const sobranteEstimadoNIO = estimarSobranteMensualNIO(answers);
  
  return {
    remesaMensualNIO,
    sobranteEstimadoNIO,
    tieneCuentaBancaria: answers.B1 === 'banco' || answers.B1 === 'cooperativa',
    tieneAhorros: answers.B2 !== 'nada',
    tieneDeudas: answers.B3 !== 'ninguna',
    quiereEmprender: answers.C1 === 'negocio',
    nivelConocimiento: 'basico',
    meta: answers.C1 || 'emergencias'
  };
}
