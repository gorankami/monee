import React, { useContext } from 'react'
import formatCurrency from '../formatCurrency'
import './TransactionRow.css'
import isExpense from '../isExpense'
import { Context } from './StoreProvider'
import { CATEGORY_FORM_OPEN } from '../Model/reducer'

export default function TransactionRow({ transaction }) {
  let classAmount =
    'amount ' + (isExpense(transaction) ? 'amount-expense' : 'amount-deposit')
  return (
    <tr className="TransactionRow">
      <td className="date">{transaction.date}</td>
      <td title={transaction.purpose}>
        <DisplayPurpose {...transaction} />
      </td>
      <td className={classAmount}>
        <DisplayAmount {...transaction} />
      </td>
      <td className="category">
        <DisplayCategory {...transaction} />
      </td>
    </tr>
  )
}

function DisplayPurpose({ purpose, target, targetAccountNumber }) {
  return (
    <>
      {purpose.length > 32 ? purpose.substring(0, 29) + '...' : purpose}
      <br />
      <small>
        {target || ''}
        {targetAccountNumber ? `(${targetAccountNumber})` : ''}
      </small>
    </>
  )
}

function DisplayAmount({ target, targetAccountNumber, amount, currency }) {
  return (
    <>
      {isExpense({ target, targetAccountNumber }) ? '-' : '+'}
      {formatCurrency({ amount, currency })}
    </>
  )
}

function DisplayCategory(transaction) {
  const [state, dispatch] = useContext(Context)
  const findRes = state.purposeCategory.find((pc) => pc.purpose === transaction.purpose)
  const category = findRes ? findRes.category : undefined

  function addCategory() {
    dispatch({ type: CATEGORY_FORM_OPEN, payload: transaction })
  }
  return (
    <>
      {!category && (
        <input type="button" value="Add category" onClick={addCategory} />
      )}
      {category && <span onClick={addCategory}>{category}</span>}
    </>
  )
}
