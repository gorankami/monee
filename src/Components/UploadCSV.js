import React, { useContext, useRef } from 'react'
import { postTransactions } from '../apiActions'
import csvStringToJson from '../digest/csvStringToJson'
import { API_TRANSACTIONS_LOAD } from '../Model/reducer'
import { Context } from './StoreProvider'
import './UploadCSV.css'

export default function UploadDB() {
  let fileReader
  const [state, dispatch] = useContext(Context)
  const ref = useRef()
  function handleFileRead() {
    const transactions = csvStringToJson(fileReader.result)

    dispatch({ type: API_TRANSACTIONS_LOAD, payload: transactions })
    postTransactions(transactions).catch((e) =>
      console.error('Unable to post transactions to API', e),
    )
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
