export function filterByDate(transactions, year, month, day) {
  if (!year) return transactions
  return transactions.filter((t) => {
    const [d, m, y] = t.date.split('.')
    return (
      (!year || year === y) && (!month || month === m) && (!day || day === d)
    )
  })
}
