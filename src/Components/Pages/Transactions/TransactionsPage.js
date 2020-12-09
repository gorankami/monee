import React, { useContext, useState } from 'react'
import { Context } from '../../StoreProvider'
import TransactionList from './TransactionList'

export default function TransactionsPage() {
  const [state] = useContext(Context)
  return (
    <>
      {/* add filters here */}
      <TransactionList
        transactions={state.PageTransactions.filteredTransactions}
      />
    </>
  )
}
