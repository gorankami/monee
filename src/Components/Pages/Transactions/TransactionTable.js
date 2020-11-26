import React, { useContext, useEffect, useState } from 'react'
import { groupBy } from 'lodash'
import TransactionRow from './TransactionRow'
import './TransactionTable.css'
import { Context } from '../Components/StoreProvider'
import getMonthLabel from '../getMonthLabel'
import MonthSummary from './MonthSummary'

export default function TransactionTable() {
  const [state] = useContext(Context)
  const [groupedTransactions, setGroupedTransactions] = useState({})
  const [page, setPage] = useState(0)
  useEffect(() => {
    let gt = groupBy(state.transactions, getMonthLabel)
    setGroupedTransactions(gt)
    setPage(0)
  }, [state.transactions])

  const keys = Object.keys(groupedTransactions)
  const groupLabel = keys[page]

  const transactionList = groupedTransactions[groupLabel] || []

  function prevPage() {
    if (page) setPage(page - 1)
  }

  function nextPage() {
    setPage(page + 1)
  }
  return (
    <div>
      <h1>{keys[page]}</h1>
      <MonthSummary monthlyTransactions={transactionList} />
      <input
        type="button"
        disabled={page === 0}
        onClick={prevPage}
        value="Prev page"
      />
      Page: {page + 1}/{keys.length}
      <input
        type="button"
        disabled={page + 1 > keys.length - 1}
        onClick={nextPage}
        value="Next page"
      />
      <table className="TransactionTable">
        <thead>
          <tr>
            <td>Date</td>
            <td>Description</td>
            <td>Amount</td>
            <td>Category</td>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((t, i) => (
            <TransactionRow key={i} transaction={t} />
          ))}
          <tr>
            <td colSpan="5"></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
