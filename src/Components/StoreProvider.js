import React, { createContext, useReducer, useEffect } from 'react'
import { getPurposeCategory, getTransactions } from '../apiActions'
import { defaultState } from '../Model/defaultState'
import { getConfig, setStorageData } from '../Model/localStorageManager'
import reducer, {
  API_PURPOSE_CATEGORY_LOAD,
  API_TRANSACTIONS_LOAD,
  API_CONFIG_LOAD,
} from '../Model/reducer'

export const Context = createContext(defaultState)

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)
  useEffect(() => {
    setStorageData(state)
  }, [state.transactions, state.purposeCategory, state.config])

  //populates transactions from api
  useEffect(() => {
    getTransactions().then((transactions) =>
      dispatch({ type: API_TRANSACTIONS_LOAD, payload: transactions }),
    )

    getPurposeCategory().then((purposeCategory) =>
      dispatch({ type: API_PURPOSE_CATEGORY_LOAD, payload: purposeCategory }),
    )

    getConfig().then((config) =>
      dispatch({ type: API_CONFIG_LOAD, payload: config }),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}
