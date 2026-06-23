/**
 * Funciones matemáticas financieras para las calculadoras de Semilla.
 */

/**
 * Calcula el crecimiento mes a mes del interés compuesto con aportaciones periódicas.
 * @param {number} principal - Monto inicial ahorrado
 * @param {number} monthlyContrib - Aporte extra mensual
 * @param {number} annualRate - Tasa de interés anual (en %)
 * @param {number} months - Plazo en meses
 * @returns {Array} Datos mes a mes para graficar en Recharts
 */
export function compoundInterestData(principal, monthlyContrib, annualRate, months) {
  const r = (annualRate / 100) / 12; // Tasa mensual
  const data = [];
  let balance = principal;
  let totalDeposited = principal;

  for (let i = 1; i <= months; i++) {
    const interestEarned = balance * r;
    balance = balance + interestEarned + monthlyContrib;
    totalDeposited += monthlyContrib;

    data.push({
      mes: `Mes ${i}`,
      mesNum: i,
      saldo: Math.round(balance),
      sinInteres: Math.round(totalDeposited),
      interesGanado: Math.round(balance - totalDeposited)
    });
  }
  return data;
}

/**
 * Calcula la cuota mensual fija de un préstamo (Fórmula francesa de amortización).
 * @param {number} principal - Monto del préstamo
 * @param {number} annualRate - Tasa anual en %
 * @param {number} months - Plazo en meses
 * @returns {number} Cuota mensual fija
 */
export function calculateMonthlyPayment(principal, annualRate, months) {
  const r = (annualRate / 100) / 12; // tasa mensual
  if (r === 0) return principal / months;
  
  const cuota = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Number(cuota.toFixed(2));
}

/**
 * Genera la tabla de amortización para un préstamo.
 * @param {number} principal 
 * @param {number} annualRate 
 * @param {number} months 
 * @returns {Object} { cuotaMensual, totalPagado, totalInteres, tabla }
 */
export function generateAmortizationTable(principal, annualRate, months) {
  const r = (annualRate / 100) / 12;
  const cuota = calculateMonthlyPayment(principal, annualRate, months);
  
  let balance = principal;
  let totalInteres = 0;
  const tabla = [];

  for (let i = 1; i <= months; i++) {
    const interesPago = balance * r;
    const capitalPago = cuota - interesPago;
    balance = Math.max(0, balance - capitalPago);
    totalInteres += interesPago;

    // Solo guardamos los primeros 12 meses o el plazo total si es menor para no saturar la UI
    if (i <= 12 || i === months) {
      tabla.push({
        cuotaNum: i,
        cuota: Math.round(cuota),
        interes: Math.round(interesPago),
        capital: Math.round(capitalPago),
        saldoRestante: Math.round(balance)
      });
    }
  }

  return {
    cuotaMensual: Math.round(cuota),
    totalPagado: Math.round(cuota * months),
    totalInteres: Math.round(totalInteres),
    tabla
  };
}

/**
 * Calcula la distribución del presupuesto basada en la regla 50/30/20.
 * @param {number} remesaTotalNIO - Ingreso total en Córdobas
 * @returns {Object} { necesidades, deseos, ahorro }
 */
export function calculateBudget503020(remesaTotalNIO) {
  const num = Number(remesaTotalNIO) || 0;
  return {
    necesidades: Math.round(num * 0.50),
    deseos: Math.round(num * 0.30),
    ahorro: Math.round(num * 0.20)
  };
}
