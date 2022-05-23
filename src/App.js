import 'main.css';
import { useEffect, useRef, useState } from 'react';
import All from 'sections/All';
import Cursor from 'components/Cursor';

function App() {
  
  const root = document.documentElement;
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: document.body.clientWidth
  });
  
  //resize + set dimensions
  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          height: window.innerHeight,
          width: document.body.clientWidth
        })
        root.style.setProperty('--real-vh', window.innerHeight + "px");
      }, 150);
    }

    window.addEventListener('resize', handleResize);
    
    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  },[]);
  
  return (
    <div className='App'>
      <Cursor dimensions={dimensions} />
      <All screenDimension={dimensions} />
    </div>
  );
}

export default App;
