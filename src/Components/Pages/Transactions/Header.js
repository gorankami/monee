import React, { useContext, useEffect, useState } from 'react'
import { getMonths } from '../../../digest/getMonths'
import getMonthName from '../../../getMonthName'
import './Header.css'
import { Context } from '../../StoreProvider'
import formatCurrency from '../../../formatCurrency'
import { PAGE_TRANSACTIONS_FILTER_MONTH } from '../../../Model/reducer'
import { getBreakdown } from '../../../digest/getBreakdown'

function getMonthLabel(month) {
  if(!month) return "All"
  const splitMonth = month.split('.')
  return getMonthName(splitMonth[0]) + ' ' + splitMonth[1]
}

export default function Header() {
  const [state, dispatch] = useContext(Context)
  const [month, setMonth] = useState('')
  const [months, setMonths] = useState([''])
  const [displayMonth, setDisplayMonth] = useState(false)

  useEffect(() => {
    const derivedMonths = getMonths(state.transactions)
    let selectedMonth = month
    if (derivedMonths.length) {
      selectedMonth = derivedMonths[0]
      setMonths([...months, ...derivedMonths])
    }
    selectMonth(selectedMonth)
  }, [state.transactions])

  const { expences, income, profit } = getBreakdown(
    state.PageTransactions.filteredTransactions,
  )

  function selectMonth(month) {
    dispatch({ type: PAGE_TRANSACTIONS_FILTER_MONTH, payload: month })
    setDisplayMonth(false)
    setMonth(month)
  }

  return (
    <header className="Header">
      <h1 className="month" onClick={() => setDisplayMonth(true)}>
        {getMonthLabel(month)} ▼
      </h1>
      {displayMonth && (
        <div className="dropdown">
          {months.map((m, i) => (
            <div key={i} onClick={(e) => selectMonth(m)}>
              {getMonthLabel(m)}
            </div>
          ))}
        </div>
      )}
      <div className="profit">
        <div className="label">Profit</div>
        <div className="amount">
          {formatCurrency({ amount: profit, currency: 'RSD' })}
        </div>
      </div>
      <div className="graph"></div>
      <div className="expences">
        <div className="label">
          Expences <span className="color-loss">▼</span>
        </div>
        <div className="amount">
          {formatCurrency({ amount: expences, currency: 'RSD' })}
        </div>
      </div>
      <div className="income">
        <div className="label">
          Income <span className="color-gain">▲</span>
        </div>
        <div className="amount">
          {formatCurrency({ amount: income, currency: 'RSD' })}
        </div>
      </div>
    </header>
  )
}
