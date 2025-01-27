import { useEffect, useState } from 'react'
import './App.css'
import { Footer } from './components/footer/Footer.jsx'

const FollowMouse = () =>{
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [hover, setHover] = useState(false);
  const [size, setSize] = useState({width:'30px',height:'30px'});

  useEffect(()=>{
    const handleMove = (event) =>{
      const {clientX, clientY} = event
      setPosition({x:clientX, y:clientY})
    }
    if(enabled){
      window.addEventListener('pointermove',handleMove)
    }
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  },[enabled])

  useEffect(()=>{
    hover&&enabled?setSize({width:'40px',height:'40px'}):setSize({width:'30px',height:'30px'})
  },[hover,enabled])

  return(
    <>
      <div
        className="mouse-follower"
        style={{
          position: 'absolute',
          backgroundColor: '#FFF',
          border: '2px solid #000',
          borderRadius: '50%',
          opacity: '0.8',
          pointerEvents: 'none',
          width: `${size.width}`,
          height: `${size.height}`,
          left: '-20px',
          top: '-20px',
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'width 200ms ease, height 200ms ease'
        }}
      ></div>
      <button onMouseLeave={()=>{setHover(false)}} onMouseOver={()=>{setHover(true)}} onClick={() => {setEnabled(!enabled)}}>{enabled?"Desactivar":"Activar"} seguimiento de mouse</button>
    </>
  )
}
function App() {
  

  return (
    <>
      <main>
        <FollowMouse/>
      </main>
      <Footer/>
    </>
  )
}

export default App
