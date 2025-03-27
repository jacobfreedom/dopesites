import React from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'

export default function Header() {
  const { width } = useWindowSize();
  return (
    <>
      <header className="header">
        <div className='header-left'>
          <div className="header-item">SELECTION</div>
          <div className="header-item">OF</div>
        </div>
        <div className="header-logo">dopesites</div>
        <div className="header-right">
          {width > 680 ? (
            <>
              <div className="header-item">BY</div>
              <a href='https://www.osobitydigital.cz/' className="header-item">JAKUB SVOBODA</a>
            </>
          ) : (
            <>
              <a href='https://www.osobitydigital.cz/' className="header-item">JAKUB</a>
              <a href='https://www.osobitydigital.cz/' className="header-item">SVOBODA</a>
            </>
          )}
        </div>
      </header>

      <div className="center">
        <a href='https://www.instagram.com/j7sxiii/' className="center-left">IG</a>
        <h1 className="center-paragraph">
          THE ONES WHICH MAKE <br/>
          THE INTERNET A NICER PLACE <br/>
          TO BE ON
        </h1>
        <a href='https://www.linkedin.com/in/jacobfreedom/' className="center-right">LI</a>
      </div>
    </>
  )
}