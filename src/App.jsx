import React from 'react'
import './App.scss'
import Header from './components/01-header/Header'
import Projects from './components/02-projects/Projects'
import Footer from './components/03-footer/Footer'

function App() {
  return (
    <div className='app'>
      <Header />
      <Projects />
      <Footer />
    </div>
  )
}

export default App
