import React, { useContext, useRef } from 'react'
import { postTransactions } from '../apiActions'
import csvStringToJson from '../digest/csvStringToJson'
import { TRANSACTIONS_LOAD } from '../Model/reducer'
import { Context } from './StoreProvider'
import './UploadCSV.css'

export default function UploadDB() {
  let fileReader
  const [state, dispatch] = useContext(Context)
  const ref = useRef()
  function handleFileRead() {
    const transactions = csvStringToJson(fileReader.result).map((t) => {
      return { ...t, category: state.purposeCategory[t.purpose] }
    })

    dispatch({ type: TRANSACTIONS_LOAD, payload: transactions })
    postTransactions(transactions)
  }

  function onFileSelection(e) {
    const file = e.target.files[0]
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  function clickUpload() {
    ref.current.click()
  }

  return (
    <>
      <input
        type="button"
        value="Upload CSV"
        className="UploadCSV"
        onClick={clickUpload}
      />
      <input
        type="file"
        hidden
        accept=".csv"
        onChange={onFileSelection}
        ref={ref}
      />
    </>
  )
}