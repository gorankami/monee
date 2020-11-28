import React, { useContext } from 'react'
import { Context } from '../../StoreProvider'
import UploadDB from '../../UploadCSV'
import './ConfigPage.css'
import Creditor from './Creditor'

export default function ConfigPage() {
  const [state] = useContext(Context)
  return (
    <div className="ConfigPage">
      <h2>Creditor</h2>
      <Creditor />
      <h2>Data</h2>
      {state.transactions.length && (
        <p>Number of transactions: {state.transactions.length}</p>
      )}
      {state.transactions.length && (
        <p>
          Transaction period:{' '}
          {state.transactions[state.transactions.length - 1].date} -{' '}
          {state.transactions[0].date}
        </p>
      )}
      <UploadDB />
    </div>
  )
}
