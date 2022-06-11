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
      
      //a bit of optimizing -- dont do all those checks for tagName unless it isnt div or section
      if (e.target.tagName !== "DIV" && e.target.tagName !== "SECTION") {
        console.log("CURSOR CHECK");
        let isText = !!(["H1","H2","H3","H4","H5","H6","P","SPAN"].find(t => t === e.target.tagName));
        let isBtn = !!(["BUTTON", "A"].find(t => t === e.target.tagName));
        
        if (e.target.dataset.hover) {
          cursorRef.current.dataset.hover=true;
        }
        else if (e.target.dataset.pointer || isBtn) {
          cursorRef.current.dataset.pointer=true;
        }
        else if (e.target.dataset.text || isText) {
          cursorRef.current.dataset.text=true;
        }
        else {
          cursorRef.current.dataset.pointer=false;
          cursorRef.current.dataset.text=false;
          cursorRef.current.dataset.hover=false;
        }
      }
    }

    window.addEventListener('mousemove', handleCursor, {passive: true});
    
    return _ => {
      window.removeEventListener('mousemove', handleCursor, {passive: true});
    }
  }, [props.dimensions])

  return (
    <>
      {props.cursor && <div className='cursor-area'>
        <div ref={cursorRef} className='cursor' />
      </div>}
    </>
  );
};

export default Cursor;