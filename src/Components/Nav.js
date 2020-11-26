import React, { useContext } from 'react'
import { PAGE_NAME_CONFIG, PAGE_NAME_TRANSACTIONS } from './Pages/pageNames'
import { PAGE_GOTO } from '../Model/reducer'
import { Context } from './StoreProvider'


export default function Nav() {
    const [state, dispatch] = useContext(Context)

  function getActiveIf(pageName) {
    return state.currentPage === pageName ? 'active' : ''
  }

  function setActive(name) {
    dispatch({ type: PAGE_GOTO, payload: name })
  }
  
  return (
    <>
      <div className={getActiveIf('')}>Overview</div>
      <div
        className={getActiveIf(PAGE_NAME_TRANSACTIONS)}
        onClick={() => setActive(PAGE_NAME_TRANSACTIONS)}
      >
        Transactions
      </div>
      <div
        className={getActiveIf(PAGE_NAME_CONFIG)}
        onClick={() => setActive(PAGE_NAME_CONFIG)}
      >
        Config
      </div>
    </>
  )
}
