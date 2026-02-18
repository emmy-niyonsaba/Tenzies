

function Die(props) {
    const{value, isHeld, hold}=props
    const dieColor={
      backgroundColor: props.isHeld ? "#59E391" : "white"
    }
  return (
    <>
          
        <button style={dieColor} onClick={hold}>{value}</button>
    </>
  )
}

export default Die
