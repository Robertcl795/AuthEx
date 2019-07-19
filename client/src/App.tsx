import React from 'react'
import './App.scss'
import NavBar from './components/layout/NavBar'
import RouterConfig from './routes'

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <main>
        <RouterConfig/>
      </main>
    </div>
  )
}

export default App
