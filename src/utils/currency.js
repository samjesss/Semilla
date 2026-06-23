/**
 * Utilidades para el manejo de monedas y tipo de cambio en Nicaragua (Contexto 2026)
 */

// Tasa de cambio oficial congelada por el BCN (Banco Central de Nicaragua)
// a partir del 1 de enero de 2024 (0% de deslizamiento cambiario anual).
export const TASA_CAMBIO = {
  USD_TO_NIO: 36.6243,
  fuente: 'Banco Central de Nicaragua (BCN)',
  politica: 'Deslizamiento cambiario del 0% anual (vigente desde enero 2024)',
  nota: 'Tasa oficial de referencia nacional. El córdoba mantiene paridad estable frente al dólar.'
};

/**
 * Formatea un monto en Córdobas (NIO)
 * @param {number} amount 
 * @param {boolean} includeSymbol 
 * @returns {string}
 */
export function formatNIO(amount, includeSymbol = true) {
  const formatted = new Intl.NumberFormat('es-NI', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
  return includeSymbol ? `C$ ${formatted}` : formatted;
}

/**
 * Formatea un monto en Dólares (USD)
 * @param {number} amount 
 * @param {boolean} includeSymbol 
 * @returns {string}
 */
export function formatUSD(amount, includeSymbol = true) {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
  return includeSymbol ? `$${formatted}` : formatted;
}

/**
 * Convierte dólares a córdobas
 * @param {number} usd 
 * @returns {number}
 */
export function usdToNio(usd) {
  return usd * TASA_CAMBIO.USD_TO_NIO;
}

/**
 * Convierte córdobas a dólares
 * @param {number} nio 
 * @returns {number}
 */
export function nioToUsd(nio) {
  return nio / TASA_CAMBIO.USD_TO_NIO;
}
