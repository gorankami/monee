import { sortedUniqBy, uniqBy } from 'lodash'
import React, { useContext, useState } from 'react'
import { PAGE_CONFIG_SAVE_FIELD } from '../../../Model/reducer'
import { Context } from '../../StoreProvider'
import './Creditor.css'

export default function Creditor() {
  const [state, dispatch] = useContext(Context)
  const [form, setForm] = useState({
    target: state.config.target || "",
    targetAccountNumber: state.config.targetAccountNumber || "",
  })

  const [showCreditorsList, setShowCreditorsList] = useState(false)

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function onBlur() {
    dispatch({ type: PAGE_CONFIG_SAVE_FIELD, payload: form })
  }

  function onShowCreditorsList() {
    setShowCreditorsList(!showCreditorsList)
  }

  function onCreditorSelect(t) {
    const formData = {
      target: t.target,
      targetAccountNumber: t.targetAccountNumber,
    }
    setForm(formData)
    dispatch({ type: PAGE_CONFIG_SAVE_FIELD, payload: formData })
    setShowCreditorsList(false)
  }

  return (
    <div className="Creditor">
      <p>
        Set creditor so the app can recognize income (creditor is labeled as
        target of transactions, that would be you). If current database has
        creditors, you can pick it from the button below:
      </p>
      <div className="pick-creditor">
        <input
          type="button"
          value="Pick creditor from transactions"
          onClick={onShowCreditorsList}
        />
        {showCreditorsList && (
          <div className="dropdown">
            <CreditorsList onCreditorSelect={onCreditorSelect} />
          </div>
        )}
      </div>

      <label htmlFor="target">
        Target (First and Last name, see transaction with income)
      </label>
      <input
        name="target"
        type="text"
        placeholder="Pera Peric"
        onChange={onChange}
        value={form.target}
        onBlur={onBlur}
      />
      <label htmlFor="targetAccountNumber">
        Target account number (see transaction with income)
      </label>
      <input
        name="targetAccountNumber"
        type="text"
        placeholder="12345678123456687"
        onChange={onChange}
        onBlur={onBlur}
        value={form.targetAccountNumber}
      />
    </div>
  )
}

function CreditorsList({ onCreditorSelect }) {
  const [state] = useContext(Context)
  if (!state.transactions.length) return 'No creditors found'
  const filteredTransactions = state.transactions.filter(
    (t) => t.target && t.targetAccountNumber,
  )

  return uniqBy(
    filteredTransactions,
    (t) => t.target + ' ' + t.targetAccountNumber,
  ).map((t, i) => (
    <div key={i} onClick={() => onCreditorSelect(t)}>
      {t.target} ({t.targetAccountNumber})
    </div>
  ))
}
