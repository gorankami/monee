export function filterByMonth(transactions, month) {
  if (!month) return transactions
  return transactions.filter((t) => {
    const splitMonth = t.date.split('.')
    return month === `${splitMonth[1]}.${splitMonth[2]}`
  })
}
