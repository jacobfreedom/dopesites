import React from 'react'
import './App.scss'
import projects from './assets/data/projects.json'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className='header-left'>
          <div className="header-item">SELECTION</div>
          <div className="header-item">OF</div>
        </div>
        <div className="header-logo">dopesites</div>
        <div className="header-right">
          <div className="header-item">BY</div>
          <a className="header-item">JAKUB SVOBODA</a>
        </div>
      </header>

      <div className="center">
        <a className="center-left">IG</a>
        <p className="center-paragraph">
          THE ONES WHICH MAKE <br/>
          THE INTERNET A NICER PLACE <br/>
          TO BE IN
        </p>
        <a className="center-right">LI</a>
      </div>

      <div className="description">
        <p className="description__line">WEEKLY DROPS</p>
        <p className="description__line">W-1</p>
        <p className="description__line">FREE TIME INITIATIVE</p>
      </div>
    </div>
  )
}

export default App
