import React, { useState } from 'react'
import Paginator from '../../Paginator'
import './TransactionList.css'
import TransactionListItem from './TransactionListItem'

export default function TransactionList({ transactions, itemsPerPage }) {
  const [pagedTransactions, setPagedTransactions] = useState([])

  return (
    <div className="TransactionList">
      <Paginator items={transactions} onPageChange={setPagedTransactions} itemsPerPage={itemsPerPage} />

      {pagedTransactions.map((t, i) => (
        <TransactionListItem key={i} transaction={t} ></TransactionListItem>
      ))}
    </div>
  )
}
