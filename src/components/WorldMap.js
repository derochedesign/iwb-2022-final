import { TheWorldMap } from "img/worldMap";
import { countries } from "data/countries";
import { useEffect, useRef, useState } from "react";
import { MarkerIcon } from "./Icons";
import { Parallax } from "react-scroll-parallax";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import Draggable  from "react-draggable";
import { migrations } from "data/migrations";
import DisasterCard from "./DisasterCard";
import { disasters } from "data/disastersCopy";

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const WorldMap = ({map, setCountry, preLit, targets, lock, colours, zoom, connections, setHoverPos, setCountryClicked, cardOpen, setCardOpen}) => {
  
  const Map = TheWorldMap;
  const [currCountry, setCurrCountry] = useState("");
  const [prevCountry, setPrevCountry] = useState("");
  const [targetsPos, setTargetsPos] = useState([]);
  const [markerAnim, setMarkerAnim] = useState(false);
  const [countriesLit, setCountriesLit] = useState(false);
  const [countriesLitVal, setCountriesLitVal] = useState(preLit);
  const mapContRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [mapTranslation, setMapTranslation] = useState(0);
  const [mapWidth, setMapWidth] = useState(0);
  const [lockMap, setLockMap] = useState(lock);
  
  const handleHover = e => {
    // Do nothing if on mobile
    if (isMobile) return;
    
    let code = e.target.id;
    if (code !== currCountry) {
      
      let _elVals = e.target.getBoundingClientRect();
      setHoverPos && setHoverPos({x:_elVals.x + _elVals.width, y:_elVals.y});
      
      setPrevCountry(currCountry);
      setCurrCountry(code);
      setCountry && setCountry({
        regionId:code,
        id: null
      });
    };
  }
  
  const handleTap = e => {
    
    if (cardOpen) return;
    
    let code = e.target.id;
    if (code.length === 2) {
      if (isMobile) {
        setHoverPos && setHoverPos({x: "unset", y: "unset"});
      } else {
        let _elVals = e.target.getBoundingClientRect();
        setHoverPos && setHoverPos({x:_elVals.x + _elVals.width, y:_elVals.y});
      }
      
      setPrevCountry(currCountry);
      setCurrCountry(code);
      setCountry && setCountry({
        regionId:code,
        id: null
      });
    };
  }

  const handleHoverMarker = e => {
    // Do nothing if on mobile
    if (isMobile) return;

    let code = e.currentTarget.dataset.country;
    let uID = e.currentTarget.dataset.uid;
    
    let yOff = 150;
    
    setHoverPos && setHoverPos({x:parseInt(e.currentTarget.style.left), y:parseInt(e.currentTarget.style.top) - yOff});
    
    setPrevCountry(currCountry);
    setCurrCountry(code);
    setCountry && setCountry({
      regionId:code,
      id: uID
    });
  }
  
  const handleHoverOutTarget = () => {
    if (isMobile) return;
    
    setCountry && setCountry({regionId:null,id: null});
  }
  
  const handleTapMarker = e => {
    // Do nothing if on mobile
    if (cardOpen) return;
    
    let code = e.currentTarget.dataset.country;
    let uID = e.currentTarget.dataset.uid;
    if (code.length === 2) {
      if (isMobile) {
        setHoverPos && setHoverPos({x: "unset", y: "unset"});
      } else {
        setHoverPos && setHoverPos({x:parseInt(e.currentTarget.style.left), y:parseInt(e.currentTarget.style.top) - 150});
      }

      setPrevCountry(currCountry);
      setCurrCountry(code);
      setCountry && setCountry({
        regionId:code,
        id: uID
      });
    }
  }
  
  useEffect(() => {
    if (!cardOpen && isMobile) {
      let curr = currCountry;
      const _to = migrations.find(m => m.regionId === curr)?.to;
      if (_to) {
        _to.forEach(t => {
          let _connEl = document.getElementById(t.regionId);
          _connEl && (_connEl.style.fill = "unset");
        })
        addPreLit();
      }
    }
  }, [cardOpen]);
  
  useEffect(() => {
    if (!isMobile) return;
    setMapWidth(mapContRef.current.scrollWidth);

  }, [mapContRef])
  
  useEffect(() => {
    if (!lock) {
      const newMapTranslation = sliderValue * (-0.8);
      setMapTranslation(newMapTranslation);
      setLockMap(true);
      setTimeout(() => {
        addPreLit();
        setLockMap(false);
      },1000)
    }
  }, [sliderValue])
  
  useEffect(() => {
    
    if (!countriesLitVal && !lockMap) {
      if (currCountry.length === 2) {
        let _countryEl = document.getElementById(currCountry);
        _countryEl && (_countryEl.style.fill = colours.hover);
      }
      if (prevCountry.length === 2) {
        let _countryEl = document.getElementById(prevCountry);
        _countryEl && (_countryEl.style.fill = "unset");
      }
    }
    else if (countriesLitVal && !lockMap) {
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
        
        //setHoverPos && setHoverPos({x:0,y:0});
        
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
    let customTargets = [];
    countriesLitVal.forEach(c => {
      litSoFar.push(c.regionId);
      let _el = document.getElementById(c.regionId);
      if (_el) {
        
        _el.style.fill = (c.regionId !== "FJ") && colours.main;
        // _el.style.stroke = "var(--colour-darkgrey)";
        _el.dataset.active = true;
        _el.dataset.hover = true;
        let _elVals = _el.getBoundingClientRect();
        if (targets) {
          //check how many of c exist in litSoFar
          let countryCount = litSoFar.filter(v => v === c.regionId).length;
          let countryCountAll = countriesLitVal.filter(v => v.regionId === c.regionId).length;
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
          
          let mod = (c.regionId === "FJ" ? 30 : 0)
          
          _elPos.push({
            left: _left,
            top: countryCountAll === 1 ? _elVals.y + (_elVals.height / 2) - mod : ((countryCount === 1) ? _elVals.y + (_elVals.height / 2) + 30 : _elVals.y + (_elVals.height / 2)),
            regionId:c.regionId,
            id:c.id, 
            el:_el
          });
        }
        else {
          
          if (_elVals.width * _elVals.height < 120) {
            let newItem = {
              left: _elVals.x + (_elVals.width / 2),
              top:  _elVals.y,
              regionId: c.regionId,
              id: c.id, 
              el: _el
            };
            customTargets.push(newItem);
          }
        }
      }
    });
    (targets && _elPos) && setTargetsPos(_elPos);
    (!targets && customTargets) && setTargetsPos(customTargets);
  }
  
  const clearPreLit = () => {
    for (const [key, val] of Object.entries(countries)) {
      let _el = document.getElementById(key);
      if (_el) {
        _el.style.fill = "unset";
        _el.dataset.active = false;
        _el.dataset.hover = true;
      }
    }
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
    if (!lockMap) {
      setMarkerAnim(true);
      setCountriesLit(true);
    }
    else {
      setMarkerAnim(false);
      setCountriesLit(false);
      clearPreLit();
      setCountry && setCountry({
        regionId:null,
        id: null
      });
    }
    
  }, [lockMap]);
  
  useEffect(() => {
    setLockMap(lock);
  },[lock])
  
  // TODO: Wrap map in Draggable
  return(
    <>
      <Parallax className="actual-map-outer" data-mobile={isMobile} 
          scale={[zoom?.startVal || 1, zoom?.endVal || 1]} 
          translateX={[zoom?.startValTrans || 0, zoom?.endValTrans || 0]}
          startScroll={zoom?.start || 0} endScroll={zoom?.end || 0}
        >
          <div className="actual-map" onMouseOver={targets ? null : handleHover} 
            onClick={isMobile ? handleTap : null} ref={mapContRef} 
            style={!isMobile ? {pointerEvents: lockMap ? "none" : "auto"} : {transform: `translateX(${mapTranslation}px)`, pointerEvents: lockMap ? "none" : "auto"}} data-active={!lockMap}
          >
            <Map/>
          </div>
          {(targets || map === 3) && !lockMap && targetsPos.map((t,i) => 
            <div className="marker" data-active={markerAnim} data-hover 
              role="button" onMouseEnter={handleHoverMarker} 
              onMouseLeave={handleHoverOutTarget} 
              onClick={handleTapMarker}
              data-country={t.regionId} data-uid={t.id} key={i}
              style={{left: t.left, top: t.top}}
            >
              <MarkerIcon hover/>
              {/* {(t.regionId === "US") && <DisasterCard data={disasters[0]} />} */}
            </div>
          )}
          { isMobile && !lock && 
            <div className="slider-container item-list-small">
              <h5>Slide to explore map</h5>
              <Slider value={sliderValue} onChange={setSliderValue} max={mapWidth}/>
            </div>
          }
        </Parallax>
    </>
  )
}
export default WorldMap;
