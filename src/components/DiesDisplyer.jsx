import  { useState } from "react"
import Die from "./Die"

function DiesDisplyer() {
    const [dies, setDies] = useState(generateDies())
function generateDies() {
    const newDies = []
    for (let i = 0; i < 10; i++) {
      newDies.push({value: Math.ceil(Math.random() * 6), isHeld: false})
    }
    return newDies
  }
  const diceElements = dies.map((die, index) => <Die key={index} value={die.value} isHeld={die.isHeld} />)

  function rollDies() {
    setDies(generateDies())
  }
  return (
   <>
     <main>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDies}>Roll Dice</button>
      </main>
   </>
  )
}

export default DiesDisplyer
