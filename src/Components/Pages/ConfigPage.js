import React, { useContext, useState } from 'react'
import { PAGE_CONFIG_SAVE_FIELD } from '../../Model/reducer'
import { Context } from '../StoreProvider'
import './ConfigPage.css'

export default function ConfigPage() {
  const [state, dispatch] = useContext(Context)
  const [form, setForm] = useState({
    target: state.config.target,
    targetAccountNumber: state.config.targetAccountNumber,
  })

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function onBlur() {
    dispatch({ type: PAGE_CONFIG_SAVE_FIELD, payload: form })
  }

  return (
    <div className="ConfigPage">
      <h2>Creditor</h2>
      <label htmlFor="target">
      Target (First and Last name, see transaction with income)</label>
      <input
        name="target"
        type="text"
        placeholder="Pera Peric"
        onChange={onChange}
        value={form.target}
        onBlur={onBlur}
      />
      <label htmlFor="targetAccountNumber">
      Target account number (see transaction with income)</label>
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
