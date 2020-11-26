import { useContext, useEffect, useState } from 'react'
import formatCurrency from '../formatCurrency'
import generateExpensesBreakdownData from '../generateExpensesBreakdownData'
import { Context } from './StoreProvider'

export default function ExpensesBreakdown() {
  const [state] = useContext(Context)

  const [expenses, setExpenses] = useState({})

  useEffect(() => {
    setExpenses(generateExpensesBreakdownData(state.transactions))
  }, [state.transactions]);

  return (
    <section>
      {Object.keys(expenses).map((month) => (
        <div key={month}>
          <h3>{month}</h3>
          {Object.keys(expenses[month]).map((currency) => (
            <div key={currency}>
              <h4>{currency}</h4>
              <BreakdownItem
                expenses={expenses[month][currency]}
                currency={currency}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

function getList(object, currency) {
  let sum = 0
  return {
    list: Object.keys(object).map((category) => {
      const amount = object[category]
      sum += amount
      return (
        <li key={category} className="flex">
          <span>{category}:</span>
          <span>{formatCurrency({ amount, currency })}</span>
        </li>
      )
    }),
    sum,
  }
}

function BreakdownItem({ expenses, currency }) {
  let expObj = expenses.expense
    ? getList(expenses.expense, currency)
    : undefined
  let depObj = expenses.deposit
    ? getList(expenses.deposit, currency)
    : undefined

  return (
    <div className="flex">
      {expObj && (
        <ul>
          {expObj.list}
          <li className="flex">
            <span>Total expenses:</span>
            <span>{formatCurrency({ amount: expObj.sum, currency })}</span>
          </li>
        </ul>
      )}
      {depObj && (
        <ul>
          {depObj.list}
          <li className="flex">
            <span>Total deposits:</span>
            <span>{formatCurrency({ amount: depObj.sum, currency })}</span>
          </li>
        </ul>
      )}
    </div>
  )
}
