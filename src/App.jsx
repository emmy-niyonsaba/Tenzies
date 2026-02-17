import React from 'react'
import './App.css'
import Die from './components/Die'
const dies = []
function App() {
      for(let i=0;i<5;i++){
        const randomNumber = Math.ceil(Math.random()*6)
        dies.push(randomNumber)
      }
  return (
    <>
    <main>
     <div className="dice-container">
        {dies.map((die,index)=><Die key={index} value={die}/>)}
     </div>
    </main>
    </>
  )
}

export default App
