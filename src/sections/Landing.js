import { useEffect, useRef, useState } from "react";
import {gsap} from "gsap";

const Landing = ({currPos, titles, secRef}) => {
  
  return (
    <>
    <section className="center-title">
      <h1>What is the <span className="i">change</span> in climate change?</h1>
    </section>
    
    <section ref={secRef} className="center-title">
      <h1>It's the <span className="reg">{titles[currPos]}</span></h1>
    </section>
    </>
  )
}
export default Landing;