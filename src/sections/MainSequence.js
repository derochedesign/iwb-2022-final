import { mainCopy } from "data/mainCopy";
import WorldMap from "components/WorldMap";
import { useEffect, useRef, useState } from "react";
import { useParallax, Parallax, ParallaxProvider } from "react-scroll-parallax";
import { disasters } from "data/disastersCopy";
import DisasterCard from "components/DisasterCard";
import { keyAffected } from "data/keyAffected";
import { migrations } from "data/migrations";
import ConnectionCard from "components/ConnectionCard";
import { otherProjects } from "data/otherProjects";
import OtherProjectCard from "components/OtherProjectCard";
import Principles from "components/Principles";
import DefinitionCard from "components/DefinitionCard";
import { definitions } from "data/definitions";
import { isMobile } from "react-device-detect";

const MainSequence = ({currPos, mainSeqStart, projectSeqStart, scrollDist, dimensions, setReadyForSetSections, readyForSetSections, setSectionsPos, scrollToStart, setScrollDistMain}) => {
  
  const getRelative = val => {
    //get percentage relative to overall scroll distance
    //ex: return 10(%) when given 100(px) and overall scroll dist is 1000(px)
    return val/scrollDist*100;
  }
  
  const getAbsolute = val => {
    //get absolute pixel value
    //ex: return 100(px) when given 10(%) and overall scroll dist is 1000(px)
    return val/100*scrollDist;
  }
  
  const fadeInLength = 200;
  const fadeInLengthShort = 100;
  const holdTextLength = getRelative(500);
  const holdMapLength = getRelative(400);
  
  //map one intro ; seq 0
  const totalSeqOne = holdTextLength*3 + (getRelative(fadeInLength));
  //map one main; seq 1
  const totalSeqTwo = totalSeqOne + holdMapLength;
  //map one outro; seq 2
  const totalSeqThree = totalSeqTwo + holdTextLength;
  //map two main; seq 3
  const totalSeqFour = totalSeqThree + holdMapLength;
  //map two outro; seq 4
  const totalSeqFive = totalSeqFour + holdTextLength;
  //map three main; seq 5
  const totalSeqSix = totalSeqFive + holdMapLength;
  //map three outro; seq 6
  const totalSeqSeven = totalSeqSix + holdTextLength*3 + (getRelative(fadeInLength));
  //map four main; seq 7
  const totalSeqEight = totalSeqSeven + holdMapLength;
  //principles in; seq 8
  const totalSeqNine = totalSeqEight + holdMapLength;
  
  const [currTitleText, setCurrTitleText] = useState(mainCopy.introduction.title);
  const [currBodyText, setCurrBodyText] = useState(
    mainCopy.introduction.body[(currPos < (holdTextLength*mainCopy.introduction.body.length)) 
      ? Math.floor(currPos / holdTextLength) 
      : mainCopy.introduction.body.length - 1]
  );
  const [beginScroll, setBeginScroll] = useState(window.scrollY);
  const [currSeq, setCurrSeq] = useState(0);
  const [currMap, setCurrMap] = useState(0);
  
  const [countryCode, setCountry] = useState("");
  const [countryCodeFixed, setCountryFixed] = useState("");
  const [lockMap, setLockMap] = useState(true);
  const [hoverPos, setHoverPos] = useState({x:null, y:null});
  const [countryClicked, setCountryClicked] = useState();
  
  //for def cards
  const [currDefinition, setCurrDefinition] = useState();
  
  const [defLeft, setDefLeft] = useState(0);
  const [defTop, setDefTop] = useState(0);
  const [defWidth, setDefWidth] = useState(0);
  
  const [cardOpen, setCardOpen] = useState(false);
  
  //map specific data
  const [currDisaster, setCurrDisaster] = useState();
  const [currIDP, setCurrIDP] = useState();
  const [currConnection, setCurrConnection] = useState();
  const mapPreLit = [
    disasters.map((d,i) => ({regionId:d.regionId, id:i})),
    keyAffected.map((k,i) => ({regionId:k.regionId, id:i})),
    migrations.map((m,i) => ({regionId:m.regionId, id:i}))
  ]
  const mapColours = [
    {
      main: "var(--colour-orange)",
      hover: "var(--colour-orange)"
    },
    {
      main: "var(--colour-yellow)",
      hover: "var(--colour-white)"
    },
    {
      main: "var(--colour-purple)",
      hover: "var(--colour-blue-dark)",
      connection: "var(--colour-blue-light)"
    }
  ]
  const mapZoom = [
    null,
    null,
    null,
    !isMobile ? {
      start: beginScroll+getAbsolute(totalSeqThree),
      end: beginScroll+getAbsolute(totalSeqThree)+(getAbsolute(holdMapLength) / 2),
      startVal: 1,
      endVal: 1.5,
      startValTrans: 0,
      endValTrans: "-15%"
    } : null,
    !isMobile ? {
      start: beginScroll+getAbsolute(totalSeqFour) - 50,
      end: beginScroll+getAbsolute(totalSeqFour)+(getAbsolute(holdTextLength) / 2),
      startVal: 1.5,
      endVal: 1,
      startValTrans: "-15%",
      endValTrans: 0
    } : null,
    null
  ];

  useEffect(() => {
    setBeginScroll(window.scrollY);
  }, [mainSeqStart]);
  
  useEffect(() => {
    if (readyForSetSections) {
      //offset to push into the next section rather than be right at the edge
      setSectionsPos(prev => 
      [...prev,
        scrollToStart+fadeInLength,
        getAbsolute(totalSeqOne)+scrollToStart, 
        getAbsolute(totalSeqThree)+scrollToStart,
        getAbsolute(totalSeqFive)+scrollToStart,
        getAbsolute(totalSeqSeven)+scrollToStart
      ]);
      setReadyForSetSections(false);
    }
  }, [readyForSetSections])
  
  useEffect(() => {
    //set hover card information
    if (currMap === 0) {
      let _currDisaster = disasters.find(d => (d.id === (countryCode.id && (201+Number(countryCode.id)))));
      setCurrDisaster(_currDisaster);
      _currDisaster ? setCardOpen(true) : setCardOpen(false);
    }
    else if (currMap === 1) {
      let _currIDP = keyAffected.find(k => k.regionId === countryCode.regionId);
      setCurrIDP(_currIDP);
    }
    else if (currMap === 2) {
      let _currConnection = migrations.find(m => m.regionId === countryCode.regionId);
      setCurrConnection(_currConnection);
      _currConnection ? setCardOpen(true) : setCardOpen(false);
    }
  }, [countryCode]);
  
  const handleClose = () => {
    setCurrDisaster();
    setCurrIDP();
    setCurrConnection();
    setCardOpen(false);
  }
  
  useEffect(() => {
    
    if (currPos < totalSeqFour) {
      let _pos = (currPos < (holdTextLength*mainCopy.introduction.body.length)) 
        ? Math.floor(currPos / holdTextLength) 
        : mainCopy.introduction.body.length - 1;
      if (mainCopy.introduction.body[_pos] !== currBodyText) setCurrBodyText(mainCopy.introduction.body[_pos]);
    }
    else {
      let _pos = (currPos - totalSeqSix < (holdTextLength*mainCopy.principles.preBody.length)) 
        ? Math.floor((currPos - totalSeqSix) / holdTextLength) 
        : mainCopy.principles.preBody.length - 1;
      if (mainCopy.principles.preBody[_pos] !== currBodyText) setCurrBodyText(mainCopy.principles.preBody[_pos]);
    }
    
    
    if (currPos <= totalSeqOne && currPos >= 0 && currSeq !== 0) setCurrSeq(0);
    else if (currPos <= totalSeqTwo && currPos >= totalSeqOne && currSeq !== 1) setCurrSeq(1);
    else if (currPos <= totalSeqThree && currPos >= totalSeqTwo && currSeq !== 2) setCurrSeq(2);
    else if (currPos <= totalSeqFour && currPos >= totalSeqThree && currSeq !== 3) setCurrSeq(3);
    else if (currPos <= totalSeqFive && currPos >= totalSeqFour && currSeq !== 4) setCurrSeq(4);
    else if (currPos <= totalSeqSix && currPos >= totalSeqFive && currSeq !== 5) setCurrSeq(5);
    else if (currPos <= totalSeqSeven && currPos >= totalSeqSix && currSeq !== 6) setCurrSeq(6);
    else if (currPos <= totalSeqEight && currPos >= totalSeqSeven && currSeq !== 7) setCurrSeq(7);
    else if (currPos <= totalSeqNine && currPos >= totalSeqEight && currSeq !== 8) setCurrSeq(8);
    
  }, [currPos]);
  
  // console.log(currSeq);
  // console.log(currMap);
  
  // NOTE: called every time we change sequences
  useEffect(() => {
    // TODO: reset 'scroll position' on map
    // When a scroll position for the draggable map will be decided, reset it here

    if (currSeq === 0) {
      setLockMap(true);
      setCurrMap(0);
    }
    else if (currSeq === 1) {
      //map one (0)
      setLockMap(false);
      setCurrTitleText(mainCopy.introduction.title);
    }
    else if (currSeq === 2) {
      setLockMap(true);
      setCurrMap(0);
    }
    else if (currSeq === 3) {
      //map two (1)
      setCurrMap(1);
      setLockMap(false);
    }
    else if (currSeq === 4) {
      setLockMap(true);
      setCurrMap(1);
    }
    else if (currSeq === 5) {
      //map three (2)
      setLockMap(false);
      setCurrMap(2);
    }
    else if (currSeq === 6) {
      setLockMap(true);
      setCurrMap(2);
      setCurrTitleText(mainCopy.principles.preTitle);
    }
    else {
      setLockMap(true);
    }

    const mapSeqs = [];
    if (mapSeqs.includes(currSeq)) {
        // TODO: do mobile stuff
        // Map should pan relative to scroll position for whole sequence
    }
  }, [currSeq]);
  
  const handleDefHover = (e) => {
    let id = e.target.dataset.def;
    let def = definitions.find(d => d.id === Number(id));
    if (def) {
      let elVals = e.target.getBoundingClientRect();
      setCurrDefinition(def);
      
      setDefLeft(elVals.x + elVals.width);
      setDefTop(elVals.y);
      
      setDefWidth(elVals.width);
    }
    else {
      setCurrDefinition();
    }
  }
  const handleDefHoverEnd = () => {
    setCurrDefinition();
  }
  
  return (
    <section className="center-title center map-inner">
      {(currDisaster) && 
        <DisasterCard data={currDisaster} left={hoverPos.x} top={hoverPos.y} dimensions={dimensions} closeCard={handleClose} />
      }
      {(currConnection) && 
        <ConnectionCard data={currConnection} left={hoverPos.x} top={hoverPos.y} dimensions={dimensions} closeCard={handleClose} />
      }
      {(currDefinition) &&
        <DefinitionCard data={currDefinition} left={defLeft} top={defTop} dimensions={dimensions} width={defWidth} closeCard={handleClose} />
      }
      <ParallaxProvider>
        {/*TODO: When mobile, blow up the map, make it draggable, height 95*/}
        {(!projectSeqStart) && <WorldMap map={currMap} colours={mapColours[currMap]} setCountry={setCountry} lock={lockMap} preLit={mapPreLit[currMap]} targets={currMap === 0} zoom={mapZoom[currSeq]} connections={currMap === 2} setHoverPos={setHoverPos} setCountryClicked={setCountryClicked} cardOpen={cardOpen} setCardOpen={setCardOpen} closeCard={handleClose} />}
        { mainSeqStart && (currSeq === 0 || currSeq === 6) &&
          <Parallax className="inherit" speed={2} startScroll={beginScroll} endScroll={beginScroll + scrollDist}>
            <Parallax className="inherit" opacity={[0,1]} startScroll={beginScroll + ( currSeq === 6 ? getAbsolute(totalSeqSix) : 0)} endScroll={beginScroll + ( currSeq === 6 ? getAbsolute(totalSeqSix) : 0) + fadeInLength}>
              <div className="center-title-inner item-list large">
                <h2 onMouseOver={handleDefHover} onMouseLeave={handleDefHoverEnd}>{currTitleText}</h2>
                <h3 onMouseOver={handleDefHover} onMouseLeave={handleDefHoverEnd}>{currBodyText}</h3>
              </div>
            </Parallax>
          </Parallax>
        }
        { !lockMap &&
          <Parallax opacity={[0,1]} startScroll={beginScroll + getAbsolute(totalSeqOne)} endScroll={beginScroll + getAbsolute(totalSeqOne) + fadeInLengthShort} className="inherit no-interact">
            <div className="map-bottom-text no-interact">
              <h5>
                {mainCopy.map[currMap].bottom}
              </h5>
            </div>
            <div className="map-top-text no-interact">
              <h5>
                {mainCopy.map[currMap].top}
              </h5>
            </div>
          </Parallax>
        }
        { (currSeq === 4 || currSeq === 2) &&
          <Parallax className="inherit" speed={2} startScroll={beginScroll} endScroll={beginScroll + scrollDist}>
            <Parallax className="inherit" opacity={[0,1]} startScroll={beginScroll + getAbsolute(totalSeqTwo)} endScroll={beginScroll + getAbsolute(totalSeqTwo) + fadeInLengthShort}>
              <div className="center-title-inner item-list large">
                <h1><span className="reg">{mainCopy.map[currMap].postTitle.text}</span> {mainCopy.map[currMap].postTitle.bold}</h1>
                <h3>{mainCopy.map[currMap].postBody}</h3>
              </div>
            </Parallax>
          </Parallax>
        }
        { currSeq === 3 &&
          <Parallax opacity={[0,1]} 
            startScroll={beginScroll + getAbsolute(totalSeqThree)} 
            endScroll={beginScroll + getAbsolute(totalSeqThree) + fadeInLengthShort} 
            className="map-top-text no-width no-interact">
            {currIDP && 
              <div className="item-list-small" data-mobile={isMobile}>
                <h3>{currIDP.name}</h3>
                <div className="item-row">
                  <h4>Disaster Displacements:</h4>
                  <h4 className="weight-bold">{`${currIDP.disaster} people`}</h4>
                </div>
                <div className="item-row">
                  <h4>Conflict Displacements:</h4>
                  <h4 className="weight-bold">{`${currIDP.conflict} people`}</h4>
                </div>
              </div>
            }
          </Parallax>
        }
        { currSeq === 7 &&
          <Parallax opacity={[0,1]} 
          startScroll={beginScroll + getAbsolute(totalSeqSeven)} 
          endScroll={beginScroll + getAbsolute(totalSeqSeven) + fadeInLengthShort} 
          className="">
            <div className="center-title-inner">
              <div className="item-list-large center">
                <h4 className="i">How do we create climate-ready communities? We start by understanding the nine core principles for building solutions.</h4>
                <h1>9 Principles to lead the way</h1>
              </div>
            </div>
          </Parallax>
        }
      </ParallaxProvider>
    </section>
  )
}
export default MainSequence;
