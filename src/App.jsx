import React from 'react'
import './App.scss'
import projects from './assets/data/projects.json'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header__item">SELECTION</div>
        <div className="header__item">OF</div>
        <div className="header__logo">dopesites</div>
        <div className="header__item">BY</div>
        <div className="header__item">JAKUB SVOBODA</div>
      </header>

      <div className="site-frame">
        <div className="site-frame__label site-frame__label--left">WEEKLY DROPS</div>
        <div className="site-frame__label site-frame__label--center">W-1</div>
        <div className="site-frame__label site-frame__label--right">FREE TIME INITIATIVE</div>
      </div>

      <div className="description">
        <div className="description__line">01</div>
        <div className="description__line">THE LIVING ONES TO MAKE</div>
        <div className="description__line">THE INTERNET A BETTER PLACE</div>
        <div className="description__line">TO BE IN.</div>
      </div>

      <div className="projects">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project"
          >
            <div className="project__frame">
              <img src={project.image} alt={project.name} className="project__image" />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default App
