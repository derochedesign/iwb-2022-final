import { TheWorldMap } from "img/worldMap";
import { countries } from "data/countries";
import { useEffect, useRef, useState } from "react";
import { MarkerIcon } from "./Icons";
import { Parallax } from "react-scroll-parallax";

const WorldMap = ({map, setCountry, preLit, targets, lock, colours, zoom}) => {
  
  const Map = TheWorldMap;
  const [currCountry, setCurrCountry] = useState("");
  const [prevCountry, setPrevCountry] = useState("");
  const [targetsPos, setTargetsPos] = useState([]);
  const [markerAnim, setMarkerAnim] = useState(false);
  const [countriesLit, setCountriesLit] = useState(false);
  const mapContRef = useRef(null);
  
  const handleHover = e => {
    let code = e.target.id;
    if (code !== currCountry) {
      setPrevCountry(currCountry);
      setCurrCountry(code);
      setCountry(code);
    };
  }
  
  const handleHoverMarker = e => {
    let code = e.currentTarget.dataset.country;
    if (code !== currCountry) {
      setPrevCountry(currCountry);
      setCurrCountry(code);
      setCountry(code);
    };
  }
  
  useEffect(() => {
    
    if (!preLit && !lock) {
      if (currCountry.length === 2) {
        let _countryEl = document.getElementById(currCountry);
        _countryEl && (_countryEl.style.fill = colours.hover);
      }
      if (prevCountry.length === 2) {
        let _countryEl = document.getElementById(prevCountry);
        _countryEl && (_countryEl.style.fill = "unset");
      }
    }
    else if (preLit && !lock) {
      const isValid = preLit.includes(currCountry);
      const isPrevValid = preLit.includes(prevCountry);
      
      if (currCountry.length === 2 && isValid) {
        let _countryEl = document.getElementById(currCountry);
        _countryEl && (_countryEl.style.fill = colours.hover);
      }
      if (prevCountry.length === 2 && isPrevValid) {
        let _countryEl = document.getElementById(prevCountry);
        _countryEl && (_countryEl.style.fill = colours.main);
      }
    }
  }, [currCountry, prevCountry]);
  
  useEffect(() => {
    let _elPos = [];
    if (preLit && countriesLit) {
      preLit.forEach(c => {
        let _el = document.getElementById(c);
        if (_el) {
          _el.style.fill = colours.main;
          // _el.style.stroke = "var(--colour-darkgrey)";
          _el.dataset.active = true;
          _el.dataset.hover = true;
          let _elVals = _el.getBoundingClientRect();
          targets && _elPos.push({vals: _elVals, id:c, el:_el});
        }
      });
      (targets && _elPos) && setTargetsPos(_elPos);
    }
    else {
      preLit.forEach(c => {
        let _el = document.getElementById(c);
        if (_el) _el.style.fill = "unset";
        _el.dataset.active = false;
        _el.dataset.hover = true;
      });
    }
    
  }, [countriesLit]);
  
  useEffect(() => {
    if (targets && targetsPos.length > 0) {
      let _targetsPos = [...targetsPos];
      targetsPos.forEach((t,i) => {
        _targetsPos[i].x = t.el.getBoundingClientRect().x;
        _targetsPos[i].y = t.el.getBoundingClientRect().y;
      });
      setTargetsPos(_targetsPos);
    }
    
    if (!lock) {
      setMarkerAnim(true);
      setCountriesLit(true);
    }
    else {
      setMarkerAnim(false);
      setCountriesLit(false);
      setCountry("");
    }
    
  }, [lock]);
  
  console.log(zoom);
  
  return(
    <>
      <Parallax className="actual-map-outer" scale={[zoom?.startVal || 1, zoom?.endVal || 1]} translateX={[zoom?.startValTrans || 0, zoom?.endValTrans || 0]} startScroll={zoom?.start || 0} endScroll={zoom?.end || 0}>
        <div className="actual-map" onMouseOver={handleHover} ref={mapContRef} style={{pointerEvents: lock ? "none" : "auto"}} data-active={!lock}>
          <Map />
        </div>
      </Parallax>
      {targets && !lock && targetsPos.map(t => 
        <div className="marker" data-active={markerAnim} data-hover role="button" onMouseOver={handleHoverMarker} 
          data-country={t.id} key={t.id} style={{left: t.vals.x + (t.vals.width/2), top: t.vals.y + (t.vals.height / 2)}}
        >
          <MarkerIcon hover/>
        </div>
      )}
    </>
  )
}
export default WorldMap;