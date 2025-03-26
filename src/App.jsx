import React from 'react'
import './App.scss'
import Projects from './components/Projects'
import Header from './components/Header'
import Footer from './components/Footer'

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
