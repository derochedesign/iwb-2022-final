import { useState, useRef, useEffect } from "react";
import { HomeIcon } from "./Icons";
import { useScrollPosition } from "tools/useScrollPosition";

const SideProgress = props => {
  
  const [currSection, setCurrSection] = useState(0);
  const [switchedSection, setSwitchedSection] = useState(true);
  const [ignoreScroll, setIgnoreScroll] = useState(false);
  const sections = [
    "Home",
    "Why",
    "Climate Change Impacts",
    "Displacement",
    "Migration Movements",
    "Climate-ready Communities",
    "Our Solutions",
    "You Can Make a Difference"
  ]
  
  const scrollPos = useRef(0);
  
  const handleNavigate = ind => {
    props.scrollTo(props.sectionsPos[ind]);
    setIgnoreScroll(true);
    setSwitchedSection(true);
    setCurrSection(ind);
  }
  
  useScrollPosition((
    ({currPos}) => {
      scrollPos.current = (currPos.y);
      
      let sVal = Math.abs(currPos.y) + 10
      let pos = props.sectionsPos.findIndex((p, i) => (i+1 === props.sectionsPos.length) ? sVal >= p : (sVal >= p && sVal <= props.sectionsPos[i+1]));
      if (pos !== currSection && !ignoreScroll) {
        setCurrSection(pos);
        setSwitchedSection(true);
      }
    }
  ),[currSection, ignoreScroll, props.sectionsPos], false, false, 200);
  
  useEffect(() => {
    if (switchedSection) {
      setTimeout(() => {
        setSwitchedSection(false);
        setIgnoreScroll(false);
      }, 1000)
    }
  }, [switchedSection])
  
  return (
    <nav aria-label="secondary" className="side-progress">
      {
        sections.map((s, i) => 
            <div key={i} className="nav-node" data-current={currSection === i} onClick={() => handleNavigate(i)}>
              {(i === 0) ?
                <HomeIcon />
              :
                <div className="node"/>
              }
              <label data-active={(currSection === i) ? switchedSection : false}>{s}</label>
            </div>
        )
      }
    </nav>
  )
}
export default SideProgress;