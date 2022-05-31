import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { WorldMap } from "components/WorldMap";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Landing from "./Landing";
import SideProgress from "components/SideProgress";
import { mainCopy } from "data/mainCopy";
import MainSequence from "./MainSequence";
import { Outlet } from "react-router";
import Team from "./Team";
import Footer from "./Footer";
import Principles from "components/Principles";
import ProjectsIntro from "./ProjectsIntro";
import ProjectsSequence from "./ProjectsSequence";
import OtherProjectsSequence from "./OtherProjectsSequence";

const All = props => {
  
  const mapRef = useRef(null);
  const mapTwoRef = useRef(null);
  const introRef = useRef(null);
  const projectsRef = useRef(null);
  const prinRef = useRef(null);
  const otherProjectsRef = useRef(null);
  
  const titles = [
    "increasing greenhouse gasses",
    "melting ice caps",
    "growing cities",
    "migrating populations",
    "shaping resilient communities",
    "The change is occurring both within and around you."
  ];
  const [currIntroPos, setIntroCurrPos] = useState(0);
  const [sectionsPos, setSectionsPos] = useState([]);
  const [readyForSetSections, setReadyForSetSections] = useState(false);
  const [scrollToStart, setScrollToStart] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(20);
  
  const [scrollDistMain, setScrollDistMain] = useState(5900);
  const [scrollDistSecond, setScrollDistSecond] = useState(3000);
  
  const scrollDistIntro = 1500;
  const [currMainPos, setMainCurrPos] = useState(0);
  const [mainSeqStart, setMainSeqStart] = useState(false);
  
  const [currSecondPos, setSecondCurrPos] = useState(0);
  const [secondSeqStart, setSecondSeqStart] = useState(false);
  
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
  const handleSecondScroll = prog => {
    setSecondCurrPos(Math.round(prog*100));
  }
  
  const scrollTo = val => {
    let newVal = val;
    if (val !== 0) {
      newVal += scrollOffset;
    }
    window.scrollTo(0, newVal);
  };
  
  const getScrollTop = ref => {
    return ref.current.getBoundingClientRect().top + window.scrollY;
  }
  
  // useEffect(() => {
  //   setScrollToStart(getScrollTop(mapRef));
  //   setReadyForSetSections(true);
  // }, [props.screenDimension]);
  
  useEffect(() => {
    setTimeout(() => {
      setSectionsPos([0]);
      setScrollToStart(getScrollTop(mapRef));
      setReadyForSetSections(true);
    }, 500);
  }, [props.screenDimension]);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (introRef.current && mapRef.current) {
      
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
          onLeaveBack: () => setMainSeqStart(false),
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
  }, [introRef?.current, mapRef?.current]);
  
  return (
    <>
      <div className="main-wrapper">
        <SideProgress sectionsPos={sectionsPos} scrollTo={scrollTo} setScrollOffset={setScrollOffset}/>
        <Landing secRef={introRef} titles={titles} currPos={currIntroPos} final={titles.length - 1 === currIntroPos}/>
        <div className="map" ref={mapRef}>
          <MainSequence 
            currPos={currMainPos} mainSeqStart={mainSeqStart} scrollDist={scrollDistMain} dimensions={props.screenDimension}
            setReadyForSetSections={setReadyForSetSections} readyForSetSections={readyForSetSections} setSectionsPos={setSectionsPos}
            scrollToStart={scrollToStart} sectionsPos={sectionsPos} setScrollDistMain={setScrollDistMain} projectSeqStart={secondSeqStart}
          />
        </div>
        <Principles dimensions={props.screenDimension} prinRef={prinRef}/>
        <ProjectsSequence seqStart={secondSeqStart} scrollDist={scrollDistSecond} dimensions={props.screenDimension} getScrollTop={getScrollTop} projectsRef={projectsRef} />
        <div className="map">
          <OtherProjectsSequence thisRef={otherProjectsRef} dimensions={props.screenDimension} />
        </div>
        <Team />
        <Footer />
      </div>
      <Outlet />
    </>
  )
}
export default All;