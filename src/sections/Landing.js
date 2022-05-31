import { useEffect, useRef, useState } from "react";
import {gsap} from "gsap";

const Landing = ({currPos, titles, secRef, final}) => {
  
  return (
    <>
    <section className="center-title">
      <div className="center-title-inner">
        <h1 data-text className="hero">What is the <span data-text className="i">change</span> in <span data-text className="reg">climate change?</span></h1>
      </div>
    </section>
    
    <section ref={secRef} className="center-title">
      <div className="center-title-inner">
        {(!final) ?
          <h1 data-text className="hero"><span data-text className="reg">It's {titles[currPos]}</span></h1>
          :
          <h1 data-text className="hero"><span data-text className="reg">{titles[currPos]}</span></h1>
        }
      </div>
    </section>
    </>
  )
}
export default Landing;