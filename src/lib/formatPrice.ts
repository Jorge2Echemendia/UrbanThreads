export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDiscount(original: number, current: number): string {
  const discount = Math.round(((original - current) / original) * 100)
  return `-${discount}%`
}