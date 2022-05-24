import { TheWorldMap } from "img/worldMap";
import { countries } from "data/countries";
import { useEffect, useRef, useState } from "react";
import { MarkerIcon } from "./Icons";
import { Parallax } from "react-scroll-parallax";
import { migrations } from "data/migrations";
import DisasterCard from "./DisasterCard";
import { disasters } from "data/disastersCopy";

const WorldMap = ({map, setCountry, preLit, targets, lock, colours, zoom, connections, setHoverPos}) => {
  
  const Map = TheWorldMap;
  const [currCountry, setCurrCountry] = useState("");
  const [prevCountry, setPrevCountry] = useState("");
  const [targetsPos, setTargetsPos] = useState([]);
  const [markerAnim, setMarkerAnim] = useState(false);
  const [countriesLit, setCountriesLit] = useState(false);
  const [countriesLitVal, setCountriesLitVal] = useState(preLit);
  const mapContRef = useRef(null);
  
  const handleHover = e => {
    let code = e.target.id;
    if (code !== currCountry) {
      
      let _elVals = e.target.getBoundingClientRect();
      setHoverPos({x:_elVals.x + _elVals.width, y:_elVals.y});
      
      setPrevCountry(currCountry);
      setCurrCountry(code);
      setCountry({
        regionId:code,
        id: null
      });
    };
  }
  
  const handleHoverMarker = e => {
    let code = e.currentTarget.dataset.country;
    let uID = e.currentTarget.dataset.uid;
    
    setHoverPos({x:parseInt(e.currentTarget.style.left), y:parseInt(e.currentTarget.style.top) - 150});
    
    setPrevCountry(currCountry);
    setCurrCountry(code);
    setCountry({
      regionId:code,
      id: uID
    });
  }
  
  useEffect(() => {
    
    if (!countriesLitVal && !lock) {
      if (currCountry.length === 2) {
        let _countryEl = document.getElementById(currCountry);
        _countryEl && (_countryEl.style.fill = colours.hover);
      }
      if (prevCountry.length === 2) {
        let _countryEl = document.getElementById(prevCountry);
        _countryEl && (_countryEl.style.fill = "unset");
      }
    }
    else if (countriesLitVal && !lock) {
      const isValid = countriesLitVal.some(c => c.regionId === currCountry);
      const isPrevValid = countriesLitVal.some(c => c.regionId === prevCountry);
      
      if (currCountry.length === 2 && isValid) {
        
        if (connections) {
          clearPreLit();
          const _to = migrations.find(m => m.regionId === currCountry).to;
          _to.forEach(t => {
            let _connEl = document.getElementById(t.regionId);
            _connEl && (_connEl.style.fill = colours.connection);
          })
        }
        
        let _countryEl = document.getElementById(currCountry);
        _countryEl && (_countryEl.style.fill = colours.hover);
        
        //setHoverPos({x:0,y:0});
        
      }
      
      if (prevCountry.length === 2 && isPrevValid) {
        let _countryEl = document.getElementById(prevCountry);
        _countryEl && (_countryEl.style.fill = colours.main);
        
        if (connections) {
          const _to = migrations.find(m => m.regionId === prevCountry).to;
          _to.forEach(t => {
            let _connEl = document.getElementById(t.regionId);
            _connEl && (_connEl.style.fill = "unset");
          })
          addPreLit();
        }
      }
      
    }
  }, [currCountry, prevCountry]);
  
  const addPreLit = () => {
    let _elPos = [];
    let litSoFar = [];
    countriesLitVal.forEach(c => {
      litSoFar.push(c.regionId);
      let _el = document.getElementById(c.regionId);
      if (_el) {
        _el.style.fill = colours.main;
        // _el.style.stroke = "var(--colour-darkgrey)";
        _el.dataset.active = true;
        _el.dataset.hover = true;
        let _elVals = _el.getBoundingClientRect();
        if (targets) {
          //check how many of c exist in countriesLitVal
          let countryCount = litSoFar.filter(v => v === c.regionId).length;
          let _left;
          
          //position differently over country when multiple
          if (countryCount === 1) {
            _left = _elVals.x + (_elVals.width / 2);
          }
          else if (countryCount === 2) {
            _left = _elVals.x + 10;
          }
          else {
            _left = _elVals.x + (_elVals.width - 10);
          }
          
          _elPos.push({
            left: _left,
            top: (countryCount === 1) ? _elVals.y + (_elVals.height / 2) : _elVals.y + (_elVals.height / 2) + 20,
            regionId:c.regionId,
            id:c.id, 
            el:_el
          });
        }
      }
    });
    (targets && _elPos) && setTargetsPos(_elPos);
  }
  
  const clearPreLit = () => {
    countriesLitVal.forEach(c => {
      let _el = document.getElementById(c.regionId);
      if (_el) _el.style.fill = "unset";
      _el.dataset.active = false;
      _el.dataset.hover = true;
    });
  }
  
  useEffect(() => {
    if (countriesLitVal && countriesLit) {
      addPreLit();
    }
    else {
      clearPreLit();
    }
  }, [countriesLit]);
  
  useEffect(() => {
    setCountriesLitVal(preLit);
  }, [preLit]);
  
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
      clearPreLit();
      setCountry({
        regionId:null,
        id: null
      });
    }
    
  }, [lock]);
  
  return(
    <>
      <Parallax className="actual-map-outer" scale={[zoom?.startVal || 1, zoom?.endVal || 1]} translateX={[zoom?.startValTrans || 0, zoom?.endValTrans || 0]} startScroll={zoom?.start || 0} endScroll={zoom?.end || 0}>
        <div className="actual-map" onMouseOver={targets ? null : handleHover} ref={mapContRef} style={{pointerEvents: lock ? "none" : "auto"}} data-active={!lock}>
          <Map />
        </div>
      </Parallax>
      {targets && !lock && targetsPos.map((t,i) => 
        <div className="marker" data-active={markerAnim} data-hover role="button" onMouseEnter={handleHoverMarker} 
          onMouseLeave={() => setCountry({regionId:null,id: null})}
          data-country={t.regionId} data-uid={t.id} key={i} style={{left: t.left, top: t.top}}
        >
          <MarkerIcon hover/>
          {/* {(t.regionId === "US") && <DisasterCard data={disasters[0]} />} */}
        </div>
      )}
    </>
  )
}
export default WorldMap;