import React, { createContext, useReducer, useEffect } from 'react'
import { getPurposeCategory, getTransactions, getConfig } from '../apiActions'
import { defaultState } from '../Model/defaultState'
import reducer, {
  API_PURPOSE_CATEGORY_LOAD,
  API_TRANSACTIONS_LOAD,
  API_CONFIG_LOAD,
} from '../Model/reducer'

export const Context = createContext(defaultState)

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    getTransactions()
      .then((transactions) =>
        dispatch({ type: API_TRANSACTIONS_LOAD, payload: transactions }),
      )
      .catch((e) => console.error('Unable to load transactions from API', e))

    getPurposeCategory()
      .then((purposeCategory) => {
        dispatch({ type: API_PURPOSE_CATEGORY_LOAD, payload: purposeCategory })
      })
      .catch((e) => console.error('Unable to load purposeCategory from API', e))

    getConfig()
      .then((config) => dispatch({ type: API_CONFIG_LOAD, payload: config }))
      .catch((e) => console.error('Unable to load config from API', e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}
