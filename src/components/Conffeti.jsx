
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti';
function Conffeti() {
    const { width, height } = useWindowSize();
  return (
    <div>
      // eslint-disable-next-line react/react-in-jsx-scope
      <Confetti width={width} height={height} />
      ///ssdfdfd
    </div>
  )
}

export default Conffeti
