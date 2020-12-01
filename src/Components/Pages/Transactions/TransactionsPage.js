import React, { useContext, useState } from 'react'
import Header from './Header'
import { Context } from '../../StoreProvider'
import TransactionList from './TransactionList'

export default function TransactionsPage() {
  const [state] = useContext(Context)
  // add filters
  return (
    <>
      <Header />
      <TransactionList
        transactions={state.PageTransactions.filteredTransactions}
      />
    </>
  )
}
