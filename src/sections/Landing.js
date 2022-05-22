import { useEffect, useRef, useState } from "react";
import {gsap} from "gsap";

const Landing = ({currPos, titles, secRef}) => {
  
  return (
    <>
    <section className="center-title">
      <div className="center-title-inner">
        <h1 className="hero">What is the <span className="i">change</span> in climate change?</h1>
      </div>
    </section>
    
    <section ref={secRef} className="center-title">
      <div className="center-title-inner">
        <h1 className="hero">It's the <span className="reg">{titles[currPos]}</span></h1>
      </div>
    </section>
    </>
  )
}
export default Landing;