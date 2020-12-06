import { each } from 'lodash'
import { useContext } from 'react'
import formatCurrency from '../formatCurrency'
import isExpense from '../isExpense'
import { Context } from './StoreProvider'

export default function MonthSummary({ monthlyTransactions }) {
  const [state] = useContext(Context)
  const categoryCurrencyArray = {}
  monthlyTransactions.forEach((t) => {
    const findRes = state.purposeCategory.find((pc) => pc.purpose === t.purpose)
    const category = findRes ? findRes.category : 'uncategorized'
    if (!categoryCurrencyArray[category]) categoryCurrencyArray[category] = {}
    const currency = t.currency || 'N/A'
    if (!categoryCurrencyArray[category][currency])
      categoryCurrencyArray[category][currency] = []
    categoryCurrencyArray[category][currency].push(t)
  })

  return (
    <>
      {Object.keys(categoryCurrencyArray).map((category, i) => {
        return (
          <div key={i}>
            <h3>{category}</h3>
            {Object.keys(categoryCurrencyArray[category]).map((currency, j) => {
              let expences = 0
              let incomes = 0
              each(categoryCurrencyArray[category][currency], (t) => {
                if (isExpense(t)) {
                  expences += t.amount
                } else {
                  incomes += t.amount
                }
              })
              return (
                <div key={`${i}${j}`}>
                  {expences
                    ? formatCurrency({
                        currency,
                        amount: -expences,
                      }) + ' '
                    : ''}
                  {incomes ? formatCurrency({ currency, amount: incomes }) : ''}
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
