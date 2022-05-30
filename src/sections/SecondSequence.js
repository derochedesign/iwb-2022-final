import WorldMap from "components/WorldMap";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useState, useEffect } from "react";
import ProjectsIntro from "./ProjectsIntro";

const SecondSequence = ({currPos, mainSeqStart, projectSeqStart, scrollDist, dimensions, setReadyForSetSections, readyForSetSections, setSectionsPos, scrollToStart, setScrollDistMain, projectsRef}) => {
  
  const getRelative = val => {
    return val/scrollDist*100;
  }
  
  const getAbsolute = val => {
    return val/100*scrollDist;
  }
  
  const [currSeq, setCurrSeq] = useState(0);
  const [beginScroll, setBeginScroll] = useState(window.scrollY);
  const [currData, setCurrData] = useState([]);
  
  const holdProjectLength = getRelative(500);
  
  const mapColours = [
    {
      main: "var(--colour-orange)",
      hover: "var(--colour-orange)"
    }
  ]
  
  const mapData = [
    [{regionId: "MX", id:null, regionId: "US", id:null}],
    [{regionId: "CA", id:null}],
    [{regionId: "PH", id:null}]
  ]
  
  useEffect(() => {
    if (currPos <= holdProjectLength && currPos >= 0 && currSeq !== 0) setCurrSeq(0);
    else if (currPos <= holdProjectLength * 2 && currPos >= holdProjectLength && currSeq !== 1) setCurrSeq(1);
    else if (currPos <= holdProjectLength * 3 && currPos >= holdProjectLength * 2 && currSeq !== 2) setCurrSeq(2);
  }, [currPos]);
  
  useEffect(() => {
    //set data
    setCurrData(mapData[currSeq]);
  }, [currSeq]);
  
  useEffect(() => {
    setBeginScroll(window.scrollY);
  }, [projectSeqStart]);
  
  return (
    <section className="center-title center map-inner">
    <h1 className="info-disp">S:{currSeq}</h1>
    <ParallaxProvider>
      {(!mainSeqStart) && <WorldMap preLit={currData} setHoverPos={null} setCountry={null} setCountryClicked={null} colours={mapColours[0]}/>}
      { (currSeq === 0) &&
        <Parallax className="inherit" opacity={[0,1]} startScroll={beginScroll} endScroll={beginScroll + 200}>
          <ProjectsIntro projectsRef={projectsRef} />
        </Parallax>
      }
    </ParallaxProvider>
    {/* <WorldMap map={currMap} colours={mapColours[currMap]} setCountry={setCountry} preLit={mapPreLit[currMap]} targets={currMap === 0} zoom={mapZoom[currSeq]} connections={currMap === 2} setHoverPos={setHoverPos} setCountryClicked={setCountryClicked} /> */}
    </section>
  )
}
export default SecondSequence;