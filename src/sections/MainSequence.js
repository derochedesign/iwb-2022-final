import { mainCopy } from "data/mainCopy";
import WorldMap from "components/WorldMap";
import { useEffect, useState } from "react";
import { useParallax, Parallax, ParallaxProvider } from "react-scroll-parallax";
import { disasters } from "data/disastersCopy";
import DisasterCard from "components/DisasterCard";
import { keyAffected } from "data/keyAffected";
import { migrations } from "data/migrations";

const MainSequence = ({currPos, mainSeqStart, scrollDist}) => {
  
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
  
  //map one intro
  const totalSeqOne = holdTextLength*3 + (getRelative(fadeInLength));
  //map one main
  const totalSeqTwo = totalSeqOne + holdMapLength;
  //map one outro
  const totalSeqThree = totalSeqTwo + holdTextLength;
  //map two main
  const totalSeqFour = totalSeqThree + holdMapLength;
  //map two outro
  const totalSeqFive = totalSeqFour + holdTextLength;
  //map three main
  const totalSeqSix = totalSeqFive + holdMapLength;
  
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
  const [lockMap, setLockMap] = useState(true);
  
  //map specific data
  const [currDisaster, setCurrDisaster] = useState();
  const [currIDP, setCurrIDP] = useState();
  const mapPreLit = [
    disasters.map(d => d.regionId),
    keyAffected.map(k => k.regionId),
    migrations.map(m => m.regionId)
  ]
  const mapColours = [
    {
      main: "var(--colour-orange)",
      hover: "var(--colour-white)"
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
    {
      start: beginScroll+getAbsolute(totalSeqThree),
      end: beginScroll+getAbsolute(totalSeqThree)+(getAbsolute(holdMapLength) / 2),
      startVal: 1,
      endVal: 1.5,
      startValTrans: 0,
      endValTrans: "-15%"
    },
    {
      start: beginScroll+getAbsolute(totalSeqFour) - 50,
      end: beginScroll+getAbsolute(totalSeqFour)+(getAbsolute(holdTextLength) / 2),
      startVal: 1.5,
      endVal: 1,
      startValTrans: "-15%",
      endValTrans: 0
    },
    null
  ]
  
  useEffect(() => {
    setBeginScroll(window.scrollY);
  }, [mainSeqStart]);
  
  useEffect(() => {
    if (currMap === 0) {
      let _currDisaster = disasters.find(d => d.regionId === countryCode);
      setCurrDisaster(_currDisaster);
    }
    else if (currMap === 1) {
      let _currIDP = keyAffected.find(k => k.regionId === countryCode);
      setCurrIDP(_currIDP);
    }
  }, [countryCode]);
  
  useEffect(() => {
    let _pos = (currPos < (holdTextLength*mainCopy.introduction.body.length)) 
      ? Math.floor(currPos / holdTextLength) 
      : mainCopy.introduction.body.length - 1;
    if (mainCopy.introduction.body[_pos] !== currBodyText) setCurrBodyText(mainCopy.introduction.body[_pos]);
    
    if (currPos <= totalSeqOne && currPos >= 0 && currSeq !== 0) setCurrSeq(0);
    else if (currPos <= totalSeqTwo && currPos >= totalSeqOne && currSeq !== 1) setCurrSeq(1);
    else if (currPos <= totalSeqThree && currPos >= totalSeqTwo && currSeq !== 2) setCurrSeq(2);
    else if (currPos <= totalSeqFour && currPos >= totalSeqThree && currSeq !== 3) setCurrSeq(3);
    else if (currPos <= totalSeqFive && currPos >= totalSeqFour && currSeq !== 4) setCurrSeq(4);
    else if (currPos <= totalSeqSix && currPos >= totalSeqFive && currSeq !== 5) setCurrSeq(5);
    
  }, [currPos]);
  
  // console.log(currSeq);
  // console.log(currMap);
  
  useEffect(() => {
    if (currSeq === 0) {
      setLockMap(true);
      setCurrMap(0);
    }
    else if (currSeq === 1) {
      setLockMap(false);
      setCurrMap(0);
    }
    else if (currSeq === 2) {
      setLockMap(true);
    }
    else if (currSeq === 3) {
      setCurrMap(1);
      setLockMap(false);
    }
    else if (currSeq === 4) {
      setLockMap(true);
    }
    else if (currSeq === 5) {
      setLockMap(false);
      setCurrMap(2);
    }
    else {
      setLockMap(true);
    }
  }, [currSeq]);
  
  return (
    <section className="center-title center map-inner">
      {(currDisaster) && 
        <DisasterCard data={currDisaster} />
      }
      <h1 className="info-disp">{currSeq}</h1>
      <ParallaxProvider>
        <WorldMap map={currMap} colours={mapColours[currMap]} setCountry={setCountry} lock={lockMap} preLit={mapPreLit[currMap]} targets={currMap === 0} zoom={mapZoom[currSeq]} />
        { mainSeqStart && currSeq === 0 &&
          <Parallax speed={2} startScroll={beginScroll} endScroll={beginScroll + scrollDist}>
            <Parallax opacity={[0,1]} startScroll={beginScroll} endScroll={beginScroll + fadeInLength}>
              <div className="center-title-inner item-list large">
                <h2>{currTitleText}</h2>
                <h3>{currBodyText}</h3>
              </div>
            </Parallax>
          </Parallax>
        }
        { currSeq === 1 &&
          <Parallax opacity={[0,1]} startScroll={beginScroll + getAbsolute(totalSeqOne)} endScroll={beginScroll + getAbsolute(totalSeqOne) + fadeInLengthShort} className="map-bottom-text no-interact">
            <h5>
              {mainCopy.map[currMap].bottom}
            </h5>
          </Parallax>
        }
        { currSeq === 2 &&
          <Parallax speed={2} startScroll={beginScroll} endScroll={beginScroll + scrollDist}>
            <Parallax opacity={[0,1]} startScroll={beginScroll + getAbsolute(totalSeqTwo)} endScroll={beginScroll + getAbsolute(totalSeqTwo) + fadeInLengthShort}>
              <div className="center-title-inner item-list large">
                <h1><span className="reg">{mainCopy.map[0].postTitle.text}</span> {mainCopy.map[0].postTitle.bold}</h1>
                <h3>{mainCopy.map[0].postBody}</h3>
              </div>
            </Parallax>
          </Parallax>
        }
        { currSeq === 3 &&
          <Parallax opacity={[0,1]} 
            startScroll={beginScroll + getAbsolute(totalSeqThree)} 
            endScroll={beginScroll + getAbsolute(totalSeqThree) + fadeInLengthShort} 
            className="map-bottom-text no-interact">
            <div className="">
              <h3>{currIDP ? currIDP.name : ""}</h3>
              <h4>Disaster Displacements: <span>{currIDP ? `${currIDP.disaster} persons` : ""}</span></h4>
              <h4>Conflict Displacements: <span>{currIDP ? `${currIDP.conflict} persons` : ""}</span></h4>
            </div>
          </Parallax>
        }
      </ParallaxProvider>
    </section>
  )
}
export default MainSequence;