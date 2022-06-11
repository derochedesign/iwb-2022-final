import 'main.css';
import { useEffect, useRef, useState } from 'react';
import All from 'sections/All';
import Cursor from 'components/Cursor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Project from 'sections/Project';
import Interactive from 'sections/Interactive';

function App() {
  
  const root = document.documentElement;
  const [cursor, setCursor] = useState(true);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: document.body.clientWidth
  });
  
  //resize + set dimensions
  useEffect(() => {
    if (isMobile) {
      setDimensions({
        height: window.innerHeight,
        width: document.body.clientWidth
      })
      root.style.setProperty('--real-vh', window.innerHeight + "px");
    }
    else {
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
    }
    
  },[]);
  
  return (
    <BrowserRouter>
      <div className='App'>
        { !isMobile &&
          <Cursor dimensions={dimensions} cursor={cursor} />
        }
        <Routes>
          <Route path="/" element={<All screenDimension={dimensions} />}>
            <Route path=":projId" element={<Project />} />
            <Route path="exhibit" element={<Interactive setCursor={setCursor} />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
