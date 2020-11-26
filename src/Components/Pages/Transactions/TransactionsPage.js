import React, { useContext, useState } from 'react'
import { filterByMonth } from '../../../digest/filterByMonth'
import CategoriesForm from '../../Modals/CategoriesForm'
import Header from './Header'
import { Context } from '../../StoreProvider'
import TransactionList from './TransactionList'

export default function TransactionsPage() {
  const [state] = useContext(Context)
  const [filteredTransactions, setFilteredTransactions] = useState([])

  function onChangeMonth(month) {
    setFilteredTransactions(filterByMonth(state.transactions, month))
  }

  return (
    <>
      <CategoriesForm />
      <Header onChangeMonth={onChangeMonth} />
      <TransactionList transactions={filteredTransactions} />
    </>
  )
}
