import { TheWorldMapProjects } from "img/worldMapProjects";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useState, useEffect, useRef } from "react";
import ProjectsIntro from "./ProjectsIntro";
import { useInView } from "react-intersection-observer";
import { projects } from "data/projects";
import { Link } from "react-router-dom";

const ProjectsSequence = ({seqStart, scrollDist, dimensions, projectsRef, getScrollTop}) => {
  
  const [currSeq, setCurrSeq] = useState(0);
  const [currMap, setCurrMap] = useState(0);
  const [prevMap, setPrevMap] = useState();
  const [beginScroll, setBeginScroll] = useState(window.scrollY);
  const [currData, setCurrData] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [refTop, setRefTop] = useState(30000);
  const [mapLocations, setMapLocations] = useState([]);
  
  const mapRef = useRef(null);
  
  const mapData = ["MXp", "CAp", "PHp"];
  const mapScales = [4,2.5,6];
  
  const {ref: projRef, inView: startInView} = useInView();
  const {ref: initRef, inView: initInView} = useInView();
  const {ref: projOneRef, inView: oneInView} = useInView({threshold:0.5});
  const {ref: projTwoRef, inView: twoInView} = useInView({threshold:0.5});
  const {ref: projThreeRef, inView: threeInView} = useInView({threshold:0.5});
  const [wasInView, setWasInView] = useState(false);
  
  const litMap = map => {
    //light map based on map data
    if (map === -1) {
      if (prevMap) {
        let el = document.getElementById(prevMap)
        if (el) el.style.fill = "unset";
        mapRef.current.style.transform = "unset";
        setPrevMap();
      }
      return;
    }
    let currMap = mapData[map];
    const el = document.getElementById(mapData[map]);
    if (prevMap && prevMap !== currMap) {
      document.getElementById(prevMap).style.fill = "unset";
      setPrevMap(currMap);
    }
    else if (!prevMap) {
      setPrevMap(currMap);
    }
    if(el){
      const v = mapLocations[map];
      let zoom = dimensions.width / v.width / mapScales[map]; //3.4, 1.89, 6.34
      
      let rightEdge = (v.x) + (v.width);
      let bottomEdge = (v.y) + (v.height);
      
      let right = dimensions.width - rightEdge;
      let bottom = dimensions.height - bottomEdge;
      
      const padding = 100/mapScales[map];
      
      mapRef.current.style.transform = `scale(${zoom}) translateX(${(right-padding*2)}px) translateY(${(bottom-padding)}px)`;
      //rightEdge-dimensions.width + 32
      el.style.fill = projects[map].colour;
    } 
  }
  
  useEffect(() => {
    if (startInView) {
      setBeginScroll(window.scrollY);
      setRefTop(window.scrollY+500);
      // setWasInView(true);
      
      let _mapLocations = [];
      mapData.forEach(m => {
        let elVals = document.getElementById(m).getBoundingClientRect();
        _mapLocations.push(elVals)
      })
      setMapLocations(_mapLocations);
    }
  }, [startInView]);
  
  useEffect(() => {
    let _currSeq = 0;
    let _currMap = -1;
    if (oneInView && !twoInView) {
      _currSeq = 1;
      _currMap = 0;
    }
    else if (twoInView && !threeInView) {
      _currSeq = 2;
      _currMap = 1;
      mapRef.current.style.transition = "transform 1s ease";
    }
    else if (threeInView) {
      _currSeq = 3;
      _currMap = 2;
      mapRef.current.style.transition = "transform 1s ease, opacity 0.5s ease";
      setFadeOut(false);
    }
    else if (!initInView && !oneInView && !twoInView && !threeInView) {
      _currSeq = 4;
    }
    mapRef?.current && litMap(_currMap);
    
    if (_currSeq > currSeq) {
      //moving down
      if (!threeInView && currSeq === 3) {
        setFadeOut(true);
      }
    }
    else {
      //moving up
    }
    setCurrSeq(_currSeq);
    setCurrMap(_currMap);
    
  }, [initInView, oneInView, twoInView, threeInView]);
  
  useEffect(() => {
    
    if (currMap !== -1) {
      let root = document.documentElement;
      root.style.setProperty('--colour-preview', projects[currMap].colour);
    }
  }, [currMap]);
  
  return (
    <ParallaxProvider>
    <section ref={projRef} className="center-title projects-preview">
      <div ref={projectsRef} className="center-title-inner">
      {(startInView) && 
        <Parallax opacity={[0,1]} startScroll={refTop} endScroll={refTop+300} className="map fixed-map">
          <div ref={mapRef} className={`map no-interact fixed-map ${fadeOut ? "inactive" : ""}`}>
            <div className="actual-map">
              <TheWorldMapProjects />
            </div>
          </div>
        </Parallax>
      }
      <ProjectsIntro />
      <div ref={initRef} className="i-o-check"/>
      {(projects.map((p,i) => 
        <section key={i} ref={i === 0 ? projOneRef : (i === 2 ? projThreeRef : projTwoRef)} className="preview" data-active={i === 0 ? oneInView : (i === 2 ? threeInView : twoInView)}>
          <div className="item-list">
            <div className="item-row preview-header">
              {p.icon()}
              <h5>{p.title}</h5>
            </div>
            <h1 className="highlight">{p.hero}</h1>
            <div className="line-div" />
            <div className="item-list-large">
              <div className="item-list">
                <h6>{p.location}</h6>
                <p>{p.body}</p>
              </div>
              <div className="three-col">
                {(p.principles.map((pp,ii) => 
                  <div key={ii} className="item-list">
                    <div className="item-row wrap">
                      {pp.icon(false)}
                      <h4 className="full-caps width-min">{pp.title}</h4>
                    </div>
                    <h5>{pp.body}</h5>
                  </div>
                ))}
              </div>
              <Link to={`/${p.slug}`}>
                <button data-pointer>Explore Project &#8594;</button>
              </Link>
            </div>
          </div>
          <div className="preview-stats">
            { p.stats.map((s,ii) => 
              <div key={ii} className="item-list-small">
                <div className="item-row center">
                  {s.icon()}
                  <div className="item-list-small stats-display">
                  {s.value.map((v,j) =>
                    <span key={j}>
                      {(j === 0 && (v.length < 5) ) ? <h2>{v}</h2> : <h6>{v}</h6>}
                    </span>
                  )}
                  </div>
                </div>
                <h6>{s.text}</h6>
              </div>
            )}
          </div>
        </section>
      ))}
      </div>
    </section>
    </ParallaxProvider>
  )
}
export default ProjectsSequence;