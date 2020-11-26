import React from 'react'
import './App.css'
import { isUserAgentMobile } from '../isUserAgentMobile'
import StoreProvider from './StoreProvider'
import MobileFooter from './MobileFooter'
import DesktopMenu from './DesktopMenu'
import Pages from './Pages/Pages'

function App() {
  const isMobile = isUserAgentMobile()
  return (
    <div className="App">
      <StoreProvider>
        {!isMobile && <DesktopMenu />}
        <Pages />
        {isMobile && <MobileFooter />}
      </StoreProvider>
    </div>
  )
}

export default App
