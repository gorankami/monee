import getMonthLabel from './getMonthLabel'
import isExpense from './isExpense'

export default function generateExpensesBreakdownData(transactions) {
  let months = {}
  transactions.forEach((t) => {
    const monthLabel = getMonthLabel(t)

    if (!months[monthLabel]) {
      months[monthLabel] = {}
    }

    const month = months[monthLabel]

    let currencyLabel = t.currency || 'RSD'
    if (!month[currencyLabel]) {
      month[currencyLabel] = {}
    }

    const currency = month[currencyLabel]
    const tType = isExpense(t) ? 'expense' : 'deposit'

    if (!currency[tType]) {
      currency[tType] = {}
    }

    const category = t.category || 'other'
    if (!currency[tType][category]) {
      currency[tType][category] = 0
    }
    if (t.amount) {
      currency[tType][category] += t.amount
    }
  })
  return months
}
