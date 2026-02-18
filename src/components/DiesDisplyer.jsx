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
        id: nanoid()
      })
    }
    return newDies
  }

  function hold(id) {
    setDies(oldDice => oldDice.map(die =>
      die.id === id ?{ ...die, isHeld: !die.isHeld } :die
    ))
  }
  {
    const diceElements = dies.map((die) => <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}

    />)

    function rollDies() {
       setDies(oldDice => oldDice.map(die => 
            die.isHeld ?
                die :
                { ...die, value: Math.ceil(Math.random() * 6) }
        ))
    }

    return (
      <>
      
        <main>
           <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDies}>Roll Dice</button>
        </main>
      </>
    )
  }
}
  export default DiesDisplyer
