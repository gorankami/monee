import React from 'react'
import './DesktopMenu.css'

export default function DesktopMenu() {
  return (
    <div className="DesktopMenu">
      <h1 className="brand">Monee </h1>
      <div>Overview</div>
      <div className="active">Transactions</div>
      <div>Config</div>
    </div>
  )
}
