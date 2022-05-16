import { useState } from "react";
import { HomeIcon } from "./Icons";


const SideProgress = props => {
  
  const [currSection, setCurrSection] = useState(0);
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
  
  return (
    <nav aria-label="secondary" className="side-progress">
      {
        sections.map((s, i) => 
            <div key={i} className="nav-node" data-current={currSection === i}>
              {(i === 0) ?
                <HomeIcon />
              :
                <div className="node"/>
              }
              <label>{s}</label>
            </div>
        )
      }
    </nav>
  )
}
export default SideProgress;