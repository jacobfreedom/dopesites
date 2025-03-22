import React from 'react'

export default function Header() {
  return (
    <header className="header">
      <div className='header-left'>
        <div className="header-item">SELECTION</div>
        <div className="header-item">OF</div>
      </div>
      <div className="header-logo">dopesites</div>
      <div className="header-right">
        <div className="header-item">BY</div>
        <a href='#' className="header-item">JAKUB SVOBODA</a>
      </div>
    </header>
  )
}