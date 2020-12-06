import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../StoreProvider'
import TransactionList from '../Transactions/TransactionList'

export default function OverviewPage() {
  const [state] = useContext(Context)
  const [uncategorizedTransactions, setUncategorizedTransactions] = useState([])

  useEffect(() => {
    setUncategorizedTransactions(
      state.transactions.filter(
        (t) => !state.purposeCategory.find((pc) => pc.purpose === t.purpose),
      ),
    )
  }, [state.transactions, state.purposeCategory])

  return (
    <>
      <h1>Uncategorized:</h1>
      <TransactionList transactions={uncategorizedTransactions} />
    </>
  )
}
