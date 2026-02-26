import { useState, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Won from "./Won"
import Conffeti from "./Conffeti"

function DiesDisplyer() {
  // Centralized time values (seconds) for each difficulty
  const times = { easy: 90, medium: 60, hard: 30, professional: 15 }

  const [dies, setDies] = useState(() => generateDies())
  // Time is stored in seconds
  const [timeLeft, setTimeLeft] = useState(times.easy)
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState("easy")


  const gameWon = dies.every(die => die.isHeld && die.value === dies[0].value)

  // 1. Timer Logic
  useEffect(() => {
    let timer
    if (gameStarted && timeLeft > 0 && !gameWon) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && !gameWon) {
      alert("Time is up! Game Over.")
      resetGame()
    }
    return () => clearInterval(timer)
  }, [gameStarted, timeLeft, gameWon])

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

  // 2. Level Handler
  function handleLevelChange(level) {
    setDifficulty(level)
    setTimeLeft(times[level])
    resetGame()
  }

  function resetGame() {
    setDies(generateDies())
    setGameStarted(false)
    // Reset time based on current difficulty
    setTimeLeft(times[difficulty])
  }

  function hold(id) {
    if (!gameStarted) setGameStarted(true)
    setDies(oldDice => oldDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  function rollDies() {
    if (!gameStarted) setGameStarted(true)
    if (gameWon) {
      resetGame()
    } else {
      setDies(oldDice => oldDice.map(die =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      ))
    }
  }

  const diceElements = dies.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ))

  // Formatting seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <main>
      {gameWon && <Conffeti />}
      {gameWon && <Won />}
      
      <h1 className="title">Emmanuel Tenzies</h1>
      
      <div className="difficulty-container">
        <button className={difficulty === "easy" ? "active" : ""} onClick={() => handleLevelChange("easy")}>Easy (1m 30s)</button>
        <button className={difficulty === "medium" ? "active" : ""} onClick={() => handleLevelChange("medium")}>Medium (1m)</button>
        <button className={difficulty === "hard" ? "active" : ""} onClick={() => handleLevelChange("hard")}>Hard (30s)</button>
        <button className={difficulty === "professional" ? "active" : ""} onClick={() => handleLevelChange("professional")}>Professional (15s)</button>
      </div>

      <div className="timer">
        Time Left: <span style={{ color: timeLeft < 10 ? "red" : "black" }}>{formatTime(timeLeft)}</span>
      </div>

      <p className="instructions">Roll until all dice are the same. Click each die to freeze it.</p>
      
      <div className="dice-container">
        {diceElements}
      </div>
      
      <button className="roll-dice" onClick={rollDies}>
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
    </main>
  )
}

export default DiesDisplyer