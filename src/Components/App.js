import React from 'react'
import './App.css'
import StoreProvider from './StoreProvider'
import MobileFooter from './MobileFooter'
import DesktopMenu from './DesktopMenu'
import { isUserAgentMobile } from '../isUserAgentMobile'
import TransactionsPage from './Pages/Transactions/TransactionsPage'

function App() {
  const isMobile = isUserAgentMobile()
  let mainContentClass = 'main-content'
  if (!isMobile) mainContentClass += ' desktop'
  return (
    <div className="App">
      <StoreProvider>
        {!isMobile && <DesktopMenu />}
        <div className={mainContentClass}>
          <TransactionsPage />
        </div>
        {isMobile && <MobileFooter />}
      </StoreProvider>
    </div>
  )
}

export default App
