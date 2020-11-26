import isExpense from '../isExpense'

export function getBreakdown(transactions) {
  let expences = 0
  let income = 0
  transactions.forEach((t) => {
    if (isExpense(t)) expences += t.amount
    else income += t.amount
  })
  return { expences, income, profit: income - expences }
}
