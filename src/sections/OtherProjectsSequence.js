import { mainCopy } from "data/mainCopy";
import WorldMapOther from "components/WorldMapOther";
import { useEffect, useRef, useState } from "react";
import { useParallax, Parallax, ParallaxProvider } from "react-scroll-parallax";
import { otherProjects } from "data/otherProjects";
import OtherProjectCard from "components/OtherProjectCard";
import { useInView } from "react-intersection-observer";

const OtherProjectsSequence = ({thisRef, dimensions}) => {

  
  const [countryCode, setCountry] = useState("");
  const [countryCodeFixed, setCountryFixed] = useState("");
  const [hoverPos, setHoverPos] = useState({x:null, y:null});
  const [countryClicked, setCountryClicked] = useState();
  const [animReady, setAnimReady] = useState(false);
  
  const {ref: mapRef, inView: mapInView} = useInView({threshold: 0.8});
  
  //map specific data
  const [currOtherProject, setCurrOtherProject] = useState();
  const otherProjectTimeoutRef = useRef();
  const mapPreLit = [
    otherProjects.map((p,i) => ({regionId:"op"+p.regionId, id:i}))
  ]
  
  const mapColours = [
    {
      main: "var(--colour-redish)",
      hover: "var(--colour-white)",
    }
  ]
  
  const handleClose = () => {
    console.log("HEELOOO");
    setCurrOtherProject([]);
  }
  
  useEffect(() => {
    //set hover card information

    

  }, [countryCode]);
  
  useEffect(() => {
    
    let _currOP = otherProjects.filter(p => "op"+p.regionId === countryClicked);
    console.log(countryClicked);
    if (countryClicked) {
      // clearTimeout(otherProjectTimeoutRef.current);
      setCurrOtherProject(_currOP);
      setCountryClicked();
    }
    
  }, [countryClicked]);
  
  useEffect(() => {
    setAnimReady(mapInView);
  }, [mapInView]);
  
  return (
    <section ref={thisRef} className="center-title center map-inner standard">
      {(currOtherProject?.length > 0) && 
        <OtherProjectCard data={currOtherProject} left={hoverPos.x} top={hoverPos.y} dimensions={dimensions} closeCard={handleClose}/>
      }
      <ParallaxProvider>
        {/*TODO: When mobile, blow up the map, make it draggable, height 95*/}
        <section className="center-title-inner no-full-height">
          <div className="item-list-med center">
            <h2>{mainCopy.otherProjectsIntro.title}</h2>
            <h4>{mainCopy.otherProjectsIntro.body}</h4>
          </div>
        </section>
        <Parallax speed={20} style={{width: "100%"}}>
          <div ref={mapRef} style={{width: "100%"}}>
            <WorldMapOther colours={mapColours[0]} animReady={animReady} setCountry={setCountry} preLit={mapPreLit[0]} targets={false} setHoverPos={setHoverPos} setCountryClicked={setCountryClicked} dimensions={dimensions}/>
          </div>
        </Parallax>
        
      </ParallaxProvider>
    </section>
  )
}
export default OtherProjectsSequence;
