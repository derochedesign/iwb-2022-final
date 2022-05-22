import { TheWorldMap } from "img/worldMap";
import { countries } from "data/countries";
import { useEffect, useRef, useState } from "react";
import { MarkerIcon } from "./Icons";

const WorldMap = ({map, setCountry, preLit, targets, lock}) => {
  
  const Map = TheWorldMap;
  const [currCountry, setCurrCountry] = useState("");
  const [prevCountry, setPrevCountry] = useState("");
  const [targetsPos, setTargetsPos] = useState([]);
  const [markerAnim, setMarkerAnim] = useState(false);
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
    console.log(e);
    let code = e.currentTarget.dataset.country;
    if (code !== currCountry) {
      setPrevCountry(currCountry);
      setCurrCountry(code);
      setCountry(code);
    };
  }
  
  useEffect(() => {
    
    if (!preLit) {
      if (currCountry.length === 2) {
        let _countryEl = document.getElementById(currCountry);
        _countryEl && (_countryEl.style.fill = "var(--colour-orange)");
      }
      if (prevCountry.length === 2) {
        let _countryEl = document.getElementById(prevCountry);
        _countryEl && (_countryEl.style.fill = "unset");
      }
    }
  }, [currCountry, prevCountry]);
  
  useEffect(() => {
    let _elPos = [];
    preLit && preLit.forEach(c => {
      let _el = document.getElementById(c);
      if (_el) {
        _el.style.fill = "var(--colour-orange)";
        targets && _elPos.push({x:(_el.getBoundingClientRect().x), y:_el.getBoundingClientRect().y, id:c, el:_el});
      }
    });
    (targets && _elPos) && setTargetsPos(_elPos);
    
  }, []);
  
  useEffect(() => {
    if (targets && targetsPos.length > 0) {
      let _targetsPos = [...targetsPos];
      targetsPos.forEach((t,i) => {
        _targetsPos[i].x = t.el.getBoundingClientRect().x;
        _targetsPos[i].y = t.el.getBoundingClientRect().y;
        console.log(t.el.getBoundingClientRect().y);
      });
      setTargetsPos(_targetsPos);
    }
    
    if (!lock) {
        setMarkerAnim(true);
    }
    else {
      setMarkerAnim(false);
    }
    
  }, [lock]);
  
  return(
    <>
      <div className="actual-map" onMouseOver={handleHover} ref={mapContRef} style={{pointerEvents: lock ? "none" : "auto"}} data-active={!lock}>
        <Map />
      </div>
      {targets && !lock && targetsPos.map(t => 
        <div className="marker" data-active={markerAnim} role="button" onMouseOver={handleHoverMarker} data-country={t.id} key={t.id} style={{left: t.x, top: t.y}}>
          <MarkerIcon />
        </div>
      )}
    </>
  )
}
export default WorldMap;