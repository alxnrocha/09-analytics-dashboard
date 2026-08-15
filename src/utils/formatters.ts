export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num);
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000) {
    return `€${(amount / 1000).toFixed(0)}k`;
  }
  return `€${amount}`;
}
