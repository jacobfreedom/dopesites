import React from 'react'
import './App.scss'
import Header from './components/01-header/Header'
import Projects from './components/02-projects/Projects'
import Footer from './components/03-footer/Footer'

const App = React.forwardRef((_, ref) => (
  <div className='app' ref={ref}>
    <Header />
    <Projects />
    <Footer />
  </div>
));

export default App;
