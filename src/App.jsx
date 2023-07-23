import { useState } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const[gameState, setGameState] = useState(false);

  return (
    <>
    <nav>
      <h1>Memory Card</h1>
    </nav>
    <main>
      <Card setGameState={setGameState}/>
      <Card setGameState={setGameState}/>
      {gameState && <div> YOU LOSE!!!</div>}

    </main>
    <footer>
      natevoyages @2023
    </footer>
    </>
  )
}

export default App
