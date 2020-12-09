import React, { useContext, useEffect, useState } from 'react'
import { filterByDate } from '../../../digest/filterByDate'
import getMonthLabel from '../../../getMonthLabel'
import { Context } from '../../StoreProvider'
import './Filter.css'

export default function Filter({ onFilter }) {
  const [state] = useContext(Context)
  const [dateFilter, setDateFilter] = useState()
  const [categoryFilter, setCategoryFilter] = useState()

  useEffect(() => {
    let filteredTransactions = state.transactions
    if (dateFilter) {
      const [d, m, y] = dateFilter.split('.')
      filteredTransactions = filterByDate(filteredTransactions, y, m)
    }
    if (categoryFilter === '') {
      filteredTransactions = filteredTransactions.filter((t) => !t.category)
    } else if (categoryFilter) {
      filteredTransactions = filteredTransactions.filter((t) => t.category === categoryFilter)
    }
    onFilter && onFilter({ filteredTransactions, dateFilter, categoryFilter })
    // setBreakdown(getBreakdown(filteredData))
  }, [state.transactions, dateFilter, categoryFilter])

  return (
    <div className="Filter">
      <h1>Filters</h1>
      <h2>Dates:</h2>
      <span onClick={() => setDateFilter()}>All time</span>
      {state.filters.months.map((month, i) => (
        <span key={i} onClick={() => setDateFilter(month)}>
          {getMonthLabel(month)}
        </span>
      ))}
      {state.filters.years.map((year, i) => (
        <span key={i} onClick={() => setDateFilter(year)}>
          {year}
        </span>
      ))}
      <h2>Categories</h2>
      <span onClick={() => setCategoryFilter()}>All</span>
      {state.filters.categories.map((category, i) => (
        <span key={i} onClick={() => setCategoryFilter(category)}>
          {category}
        </span>
      ))}
      <span onClick={() => setCategoryFilter('')}>Uncategorized</span>
    </div>
  )
}
