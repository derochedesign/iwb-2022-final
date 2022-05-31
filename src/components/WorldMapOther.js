import { useEffect, useRef, useState } from "react";
import { MarkerIcon } from "./Icons";
import { Parallax } from "react-scroll-parallax";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import Draggable  from "react-draggable";
import { TheWorldMapOtherProjects } from "img/worldMapOtherProjects";

const WorldMapOther = ({setCountry, preLit, targets, colours, setHoverPos, setCountryClicked, animReady, dimensions}) => {
  
  const Map = TheWorldMapOtherProjects;
  const [currCountry, setCurrCountry] = useState("");
  const [prevCountry, setPrevCountry] = useState("");
  const [targetsPos, setTargetsPos] = useState([]);
  const [markerAnim, setMarkerAnim] = useState(false);
  const [currHover, setCurrHover] = useState();
  const [prevHover, setPrevHover] = useState();
  const [countriesLitVal, setCountriesLitVal] = useState(preLit);
  const [smallCountries, setSmallCountries] = useState([]);
  const mapContRef = useRef(null);
  const scrollPos = useRef(0);
  const [offset, setOffset] = useState(0);
  
  const handleHover = e => {
    
    let _curr = e.target.id;
    if (_curr !== currHover && animReady) {
      setPrevHover(currHover);
      setCurrHover(_curr);
    }
  }
  
  useEffect(() => {
      const onScroll = () => setOffset(window.pageYOffset);
      // clean up code
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  useEffect(() => {
    
    const isValid = countriesLitVal.some(c => c.regionId === currHover);
    const isPrevValid = countriesLitVal.some(c => c.regionId === prevHover);
    
    if (currHover && currHover.length === 4 && isValid) {
      console.log(currHover);
      let _countryEl = document.getElementById(currHover);
      _countryEl && (_countryEl.style.fill = colours.hover);
    }
    if (prevHover && prevHover.length === 4 && isPrevValid) {
      let _countryEl = document.getElementById(prevHover);
      _countryEl && (_countryEl.style.fill = colours.main);
    }
  }, [currHover, prevHover]);
  
  const handleTap = e => {
    
  }
  
  const handleClick = e => {
    
    let _elVals = e.target.getBoundingClientRect();
    setHoverPos && setHoverPos({x:_elVals.x + _elVals.width, y:_elVals.y});
    
    if (countriesLitVal.find( l => l.regionId === e.target.id)) {
      setCountryClicked && setCountryClicked(e.target.id);
    }
    else {
      setCountryClicked && setCountryClicked("");
    }
  }

  
  const handleTapMarker = e => {
    let code = e.currentTarget.dataset.country;
    let _elVals = e.currentTarget.getBoundingClientRect();
    setHoverPos && setHoverPos({x:_elVals.x + _elVals.width, y:_elVals.y});
    
    if (countriesLitVal.find( l => l.regionId === code)) {
      setCountryClicked && setCountryClicked(code);
    }
    else {
      setCountryClicked && setCountryClicked("");
    }
  }
  
  useEffect(() => {
    
    if (!countriesLitVal) {
      if (currCountry.length === 2) {
        let _countryEl = document.getElementById(currCountry);
        _countryEl && (_countryEl.style.fill = colours.hover);
      }
      if (prevCountry.length === 2) {
        let _countryEl = document.getElementById(prevCountry);
        _countryEl && (_countryEl.style.fill = "unset");
      }
    }
    else if (countriesLitVal) {
      const isValid = countriesLitVal.some(c => c.regionId === currCountry);
      const isPrevValid = countriesLitVal.some(c => c.regionId === prevCountry);
      
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
  
  const addPreLit = () => {
    let _elPos = [];
    let litSoFar = [];
    let customTargets = [];
    let _smallCountries = [];
    countriesLitVal.forEach(c => {
      litSoFar.push(c.regionId);
      let _el = document.getElementById(c.regionId);
      // console.log(_el);
      if (_el) {
        
        _el.style.fill = (c.regionId !== "opFJ") && colours.main;
        // _el.style.stroke = "var(--colour-darkgrey)";
        _el.dataset.active = true;
        _el.dataset.pointer = true;
        let _elVals = _el.getBoundingClientRect();
        // console.log(_elVals);
        
        if (_elVals.width * _elVals.height < 140 || c.regionId === "opFJ") {
          
          _smallCountries.push(_el);
          //get location of container
          let contElVals = mapContRef.current.getBoundingClientRect();
          
          let _left = _elVals.x - contElVals.x;
          let _top = _elVals.y - contElVals.y;
          //then get location of country
          
          console.log(_elVals);
          let newItem = {
            left: _left + (_elVals.width / 2),
            top: _top - (c.regionId === "opFJ" ? 30 : 0),
            regionId: c.regionId,
            id: c.id, 
            el: _el
          };
          customTargets.push(newItem);
        }
      }
    });
    (targets && _elPos) && setTargetsPos(_elPos);
    (!targets && customTargets) && setTargetsPos(customTargets);
    (!targets && customTargets) && setSmallCountries(_smallCountries);
  }
  
  const clearPreLit = () => {
    countriesLitVal.forEach(c => {
      let _el = document.getElementById(c.regionId);
      if (_el) {
        _el.style.fill = "unset";
        _el.dataset.active = false;
        _el.dataset.pointer = true;
      }
    });
  }
  
  const updateTargetPos = () => {
    let _targetsPos = targetsPos;
    let customTargets = [];
    smallCountries.forEach(c => {
      let elY = c.getBoundingClientRect().y;
      _targetsPos.top = elY;
    })
    console.log(_targetsPos);
    setTargetsPos(_targetsPos);
  }
  
  useEffect(() => {
    // updateTargetPos();
  }, [offset]);
  
  useEffect(() => {
    console.log("changes");
  },[targetsPos])
  
  useEffect(() => {
    if (countriesLitVal && animReady) {
      addPreLit();
    }
    else {
      clearPreLit();
    }
  }, [countriesLitVal]);
  
  useEffect(() => {
    setCountriesLitVal(preLit);
  }, [preLit]);
  
  // TODO: Wrap map in Draggable
  return(
    <>
      <div ref={mapContRef} className="actual-map-outer" >
        <div className="actual-map" onMouseOver={handleHover}
          onClick={!isMobile ? handleClick : handleTap} 
          data-active={true}
        >
          <Map/>
        </div>
        {targetsPos.map((t,i) => 
          <div className="marker" data-active={animReady} data-pointer 
            role="button" 
            onClick={handleTapMarker}
            data-country={t.regionId} data-uid={t.id} key={i}
            style={{left: t.left, top: t.top}}
          >
            <MarkerIcon pointer/>
            {/* {(t.regionId === "US") && <DisasterCard data={disasters[0]} />} */}
          </div>
        )}
      </div>
    </>
  )
}
export default WorldMapOther;
