import {useState} from 'react'
import './App.css'
import Die from './components/Die'
function App() {


  ///      Question : how i am looping five t((ime and get 10 number in array?
  const[dies,setDies] = useState(generateDies())
  function generateDies(){
    const newDies = []
    for(let i=0;i<10;i++){
      newDies.push(Math.ceil(Math.random()*6))
    }
      return newDies
  }



   const diceElements = dies.map((die,index) => <Die key={index} value={die}/>)


  function rollDies(){
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

export default App
