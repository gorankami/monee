import React, { useContext, useEffect } from 'react'
import { Context } from './StoreProvider'

export default function CacheManager() {
  const [state] = useContext(Context)
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions))
    localStorage.setItem(
      'purposeCategory',
      JSON.stringify(state.purposeCategory),
    )
  }, [state])
  return <></>
}
