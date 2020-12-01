import React, { useEffect, useContext } from 'react'
import { getTransactions, getPurposeCategory } from '../apiActions'
import { API_PURPOSE_CATEGORY_LOAD, API_TRANSACTIONS_LOAD } from '../Model/reducer'
import { Context } from './StoreProvider'

export default function DataLoader() {
  const dispatch = useContext(Context)[1]

  //populates transactions from api
  useEffect(() => {
    getTransactions().then((transactions) =>
      dispatch({ type: API_TRANSACTIONS_LOAD, payload: transactions }),
    )

    getPurposeCategory().then((purposeCategory) =>
      dispatch({ type: API_PURPOSE_CATEGORY_LOAD, payload: purposeCategory }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
