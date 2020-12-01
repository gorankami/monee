import React, { useContext } from 'react'
import { Context } from '../../StoreProvider'
import TransactionList from '../Transactions/TransactionList'

export default function OverviewPage() {
  const [state] = useContext(Context)

  const uncategorizedTransactions = state.transactions.filter(
    (t) => !state.purposeCategory[t.purpose],
  )

  return (
    <>
      <h1>Uncategorized:</h1>
      <TransactionList transactions={uncategorizedTransactions}/>
    </>
  )
}
