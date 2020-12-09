import React, { useState } from 'react'
import Header from './Header'
import TransactionList from '../Transactions/TransactionList'

export default function OverviewPage() {
  const [filteredTransactions, setFilteredTransactions] = useState([])
  function onFilter(transactions) {
    setFilteredTransactions(transactions)
  }
  return (
    <div className="OverviewPage">
      <Header onFilter={onFilter} />
      <TransactionList transactions={filteredTransactions} itemsPerPage={10} />
    </div>
  )
}
