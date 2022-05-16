import 'main.css';
import { useEffect, useRef, useState } from 'react';
import All from 'sections/All';

function App() {
  
  const root = document.documentElement;
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: document.body.clientWidth
  });

  
  //scroll stuff
  const [offY, setOffY] = useState(0);
  const handleScroll = () => setOffY(window.pageYOffset);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {passive:true});
    
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);
  
  
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
      <All />
    </div>
  );
}

export default App;
