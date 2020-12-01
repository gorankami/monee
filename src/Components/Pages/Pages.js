import React, { useContext } from 'react'
import { Context } from '../StoreProvider'
import ConfigPage from './Config/ConfigPage'
import TransactionsPage from './Transactions/TransactionsPage'
import {
  PAGE_NAME_OVERVIEW,
  PAGE_NAME_TRANSACTIONS,
  PAGE_NAME_CONFIG,
} from './pageNames'

import { isUserAgentMobile } from '../../isUserAgentMobile'
import OverviewPage from './Overview/OverviewPage'
import CategoriesForm from '../Modals/CategoriesForm'

export default function Pages() {
  const [state] = useContext(Context)

  const isMobile = isUserAgentMobile()
  let mainContentClass = 'main-content'
  if (!isMobile) mainContentClass += ' desktop'

  return (
    <div className={mainContentClass}>
      <CategoriesForm />
      {state.currentPage === PAGE_NAME_OVERVIEW && <OverviewPage />}
      {state.currentPage === PAGE_NAME_TRANSACTIONS && <TransactionsPage />}
      {state.currentPage === PAGE_NAME_CONFIG && <ConfigPage />}
    </div>
  )
}
