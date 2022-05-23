import { useState, useRef, useEffect } from 'react'

const Cursor = (props) => {

  const cursorRef = useRef();
  
  useEffect(() => {
    let timeoutId = null;
    const handleCursor = (e) => {
      const cursorX = e.clientX + parseInt(10);
      const cursorY = e.clientY + parseInt(10);
      let offsetX = cursorRef.current.offsetWidth / 2 + 10;
      let offsetY = cursorRef.current.offsetHeight / 2 + 10;
      cursorRef.current.style.transform = `translate3d(${cursorX-offsetX}px,${cursorY-offsetY}px,0)`;
      
      if (e.target.dataset.text) {
        cursorRef.current.dataset.text=true;
      }
      else if (e.target.dataset.pointer) {
        cursorRef.current.dataset.pointer=true;
      }
      else if (e.target.dataset.hover) {
        cursorRef.current.dataset.hover=true;
      }
      else {
        cursorRef.current.dataset.pointer=false;
        cursorRef.current.dataset.text=false;
        cursorRef.current.dataset.hover=false;
      }
      
    }

    window.addEventListener('mousemove', handleCursor, {passive: true});
    
    return _ => {
      window.removeEventListener('mousemove', handleCursor, {passive: true});
    }
  }, [props.dimensions])

  return (
    <div className='cursor-area'>
      <div ref={cursorRef} className='cursor' />
    </div>
  );
};

export default Cursor;