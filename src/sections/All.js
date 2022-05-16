import { useEffect, useRef, useState } from "react";
import { WorldMap } from "components/WorldMap";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { MarkerIcon, ProjectOneIcon } from "components/Icons";
import DisasterCard from "components/DisasterCard";
import { disasters } from "data/disastersCopy";
import Landing from "./Landing";
import SideProgress from "components/SideProgress";

const All = props => {
  
  const ref = useRef(null);
  const introRef = useRef(null);
  
  const titles = [
    "greenhouse gasses",
    "ice caps",
    "carbon footprints",
    "growing cities",
    "resilient communities",
    "people"
  ];
  const [currPos, setCurrPos] = useState(0);
  const scrollDist = 1000;
  
  const handleScroll = prog => {
    const breaks = 1 / titles.length;
    
    titles.forEach((t, i) => {
      if (prog > i*breaks && prog < (i+1)*breaks) {
        setCurrPos(i);
        return;
      }
    })
  }
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (introRef.current) {
    const stopTrigger = () => {
      const tl = gsap.timeline({
        delay: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "center 50%",
          end: () => "+=800",
          pin: true,
          scrub: true,
          markers: true
        }
      });
      return tl;
    };
    
    const stopIntroText = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: () => `+=${scrollDist}`,
          pin: true,
          scrub: true,
          markers: false,
          onUpdate: (e) => handleScroll(e.progress)
        }
      });
      return tl;
    };
    
    const master = gsap.timeline();
  
    master.add(stopIntroText());
    master.add(stopTrigger());
  }
  }, [introRef.current]);
  
  return (
    <>
      <SideProgress />
      <Landing secRef={introRef} titles={titles} currPos={currPos}/>
      <div className="map" ref={ref}>
        <WorldMap />
      </div>
      <h2>testing</h2>
      <DisasterCard data={disasters[0]} />
      <MarkerIcon />
    </>
  )
}
export default All;