import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { Context } from '../../StoreProvider'
import formatCurrency from '../../../formatCurrency'
import { getBreakdown } from '../../../digest/getBreakdown'
import Filter from '../Overview/Filter'

export default function Header(props) {
  const [state] = useContext(Context)
  const [breakdown, setBreakdown] = useState({})

  useEffect(() => {
    setBreakdown(getBreakdown(state.transactions || []))
  }, [])

  function onFilter({ filteredTransactions }) {
    setBreakdown(getBreakdown(filteredTransactions || []))
    props.onFilter && props.onFilter(filteredTransactions)
  }

  const { expences, income, profit } = breakdown
  return (
    <header className="Header">
      <Filter onFilter={onFilter} />
      
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
