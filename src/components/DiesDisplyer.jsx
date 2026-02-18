import { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
function DiesDisplyer() {
  const [dies, setDies] = useState(generateDies())
  function generateDies() {
    const newDies = []
    for (let i = 0; i < 10; i++) {
      newDies.push({ 
        value: Math.ceil(Math.random() * 6),
         isHeld: false,
         id:nanoid()
        })
    }
    return newDies
  }

   function hold(id){
    console.log(id)
  }
  const diceElements = dies.map((die) => <Die 
  key={die.id} 
  value={die.value}
   isHeld={die.isHeld}
   hold={() => hold(die.id)}

  />)

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
