import React, { useContext } from 'react'
import isExpense from '../../../isExpense'
import { CATEGORY_FORM_OPEN } from '../../../Model/reducer'
import { Context } from '../../StoreProvider'
import './TransactionListItem.css'

export default function TransactionListItem({ transaction }) {
  const arrowDirection = isExpense(transaction) ? (
    <span className="loss">▼</span>
  ) : (
    <span className="gain">▲</span>
  )
  const [state, dispatch] = useContext(Context)
  const findRes = state.purposeCategory.find(
    (pc) => pc.purpose === transaction.purpose,
  )
  const category = findRes ? findRes.category : undefined
  function addCategory() {
    dispatch({ type: CATEGORY_FORM_OPEN, payload: transaction })
  }
  return (
    <div className="TransactionListItem" onClick={addCategory}>
      <div className="date">{transaction.date}</div>
      <div className="amount" title={transaction.amount}>
        {transaction.amount}
      </div>
      <div className="currency">
        {transaction.currency}
        {arrowDirection}
      </div>
      <div className="purpose" title={transaction.purpose}>
        {transaction.purpose}
      </div>
      <small className="target">
        {transaction.target || ''}
        {transaction.targetAccountNumber
          ? `(${transaction.targetAccountNumber})`
          : ''}
      </small>
      {category && <div className="category">{category}</div>}
    </div>
  )
}
