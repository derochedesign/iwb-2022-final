import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { WorldMap } from "components/WorldMap";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { MarkerIcon, ProjectOneIcon } from "components/Icons";
import Landing from "./Landing";
import SideProgress from "components/SideProgress";
import { mainCopy } from "data/mainCopy";
import MainSequence from "./MainSequence";
import { Outlet } from "react-router";
import Team from "./Team";
import Footer from "./Footer";

const All = props => {
  
  const mapRef = useRef(null);
  const introRef = useRef(null);
  
  const titles = [
    "greenhouse gasses",
    "ice caps",
    "carbon footprints",
    "growing cities",
    "resilient communities",
    "people"
  ];
  const [currIntroPos, setIntroCurrPos] = useState(0);
  const [sectionsPos, setSectionsPos] = useState([]);
  
  const scrollDistIntro = 1500;
  const scrollDistMain = 4000;
  const [currMainPos, setMainCurrPos] = useState(0);
  const [mainSeqStart, setMainSeqStart] = useState(false);
  
  const handleIntroScroll = prog => {
    const breaks = 1 / titles.length;
    
    titles.forEach((t, i) => {
      if (prog > i*breaks && prog < (i+1)*breaks) {
        setIntroCurrPos(i);
        return;
      }
    })
  }
  
  const handleScroll = prog => {
    setMainCurrPos(Math.round(prog*100));
  }
  
  const scrollTo = val => {
    window.scrollTo(0, val);
  };
  
  const getScrollTop = ref => {
    return ref.current.getBoundingClientRect().top;
  }
  
  useEffect(() => {
    let _sPos = [0];
    _sPos.push(getScrollTop(introRef), getScrollTop(mapRef));
    setSectionsPos(_sPos);
    
    //there must be a better way
    setTimeout(() => {
      let _sPos = [0];
      _sPos.push(getScrollTop(introRef), getScrollTop(mapRef));
      setSectionsPos(_sPos);
    }, 500);
    
  }, [props.screenDimension]);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (introRef.current) {
    const stopTrigger = () => {
      const tl = gsap.timeline({
        delay: 1,
        scrollTrigger: {
          trigger: mapRef.current,
          start: "center 50%",
          end: () => `+=${scrollDistMain}`,
          pin: true,
          scrub: true,
          markers: false,
          onUpdate: (e) => handleScroll(e.progress),
          onEnter: () => setMainSeqStart(true),
          onLeaveBack: () => setMainSeqStart(false)
        }
      });
      return tl;
    };
    
    const stopIntroText = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: () => `+=${scrollDistIntro}`,
          pin: true,
          scrub: true,
          markers: false,
          onUpdate: (e) => handleIntroScroll(e.progress)
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
      <div className="main-wrapper">
        <SideProgress sectionsPos={sectionsPos} scrollTo={scrollTo}/>
        <Landing secRef={introRef} titles={titles} currPos={currIntroPos}/>
        <div className="map" ref={mapRef}>
          <MainSequence currPos={currMainPos} mainSeqStart={mainSeqStart} scrollDist={scrollDistMain} dimensions={props.screenDimension}/>
        </div>
        <Team />
        <Footer />
      </div>
      <Outlet />
    </>
  )
}
export default All;