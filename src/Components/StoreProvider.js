import React, { createContext, useReducer } from 'react'
import { defaultState } from '../Model/defaultState'
import reducer from '../Model/reducer'
import CacheManager from './CacheManager'
import DataLoader from './DataLoader'

export const Context = createContext(defaultState)

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <Context.Provider value={[state, dispatch]}>
      <DataLoader></DataLoader>
      <CacheManager />
      {children}
    </Context.Provider>
  )
}
