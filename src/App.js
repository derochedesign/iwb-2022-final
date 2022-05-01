import 'main.css';
import { useEffect, useState } from 'react';

function App() {
  
  const root = document.documentElement;
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: document.body.clientWidth
  });
  console.log(dimensions);
  
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
    <div className="App">
      <main>
      </main>
    </div>
  );
}

export default App;
