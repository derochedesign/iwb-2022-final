import { mainCopy } from "data/mainCopy";
import WorldMap from "components/WorldMap";
import { useEffect, useState } from "react";
import { useParallax, Parallax, ParallaxProvider } from "react-scroll-parallax";
import { disasters } from "data/disastersCopy";
import DisasterCard from "components/DisasterCard";

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
  const holdTextLength = getRelative(250);
  
  const mapOnePreLit = disasters.map(d => d.regionId);
  
  const totalSeqOne = holdTextLength*3 + (getRelative(fadeInLength));
  const totalSeqTwo = 40;
  
  const [currTitleText, setCurrTitleText] = useState(mainCopy.introduction.title);
  const [currBodyText, setCurrBodyText] = useState(
    mainCopy.introduction.body[(currPos < (holdTextLength*mainCopy.introduction.body.length)) 
      ? Math.floor(currPos / holdTextLength) 
      : mainCopy.introduction.body.length - 1]
  );
  const [beginScroll, setBeginScroll] = useState(window.scrollY);
  const [currSeq, setCurrSeq] = useState(0);
  
  const [countryCode, setCountry] = useState("");
  const [currDisaster, setCurrDisaster] = useState();
  const [lockMap, setLockMap] = useState(true);
  
  useEffect(() => {
    setBeginScroll(window.scrollY);
  }, [mainSeqStart]);
  
  useEffect(() => {
    let _currDisaster = disasters.filter(d => d.regionId === countryCode);
    setCurrDisaster(_currDisaster[0]);
  }, [countryCode]);
  
  useEffect(() => {
    let _pos = (currPos < (holdTextLength*mainCopy.introduction.body.length)) 
      ? Math.floor(currPos / holdTextLength) 
      : mainCopy.introduction.body.length - 1;
    if (mainCopy.introduction.body[_pos] !== currBodyText) setCurrBodyText(mainCopy.introduction.body[_pos]);
    
    if (currPos <= totalSeqOne && currPos >= 0 && currSeq !== 0) setCurrSeq(0);
    else if (currPos <= totalSeqTwo && currPos >= totalSeqOne && currSeq !== 1) setCurrSeq(1); 
    
  }, [currPos]);
  
  useEffect(() => {
    if (currSeq === 1) {
      setLockMap(false);
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
      <ParallaxProvider>
        <WorldMap map={1} setCountry={setCountry} lock={lockMap} preLit={mapOnePreLit} targets />
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
          <Parallax opacity={[0,1]} startScroll={beginScroll + getAbsolute(totalSeqOne)} endScroll={beginScroll + getAbsolute(totalSeqOne) + fadeInLength}>
            <div>
              
            </div>
          </Parallax>
        }
      </ParallaxProvider>
    </section>
  )
}
export default MainSequence;