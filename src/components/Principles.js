import { mainCopy } from "data/mainCopy";
import { useState } from "react";
import PrincipleCard from "./PrincipleCard";

const Principles = props => {
  
  const principles = mainCopy.principles.principles;
  const [showCard, setShowCard] = useState(false);
  const [currPrinciple, setCurrPrinciple] = useState();
  
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  
  const handleHover = (e, id) => {
    let pri = principles.find(p => p.id === id);
    if (pri) {
      let elVals = e.currentTarget.getBoundingClientRect();
      console.log(elVals);
      setCurrPrinciple(pri);
      setShowCard(true);
      setLeft(elVals.x);
      setTop(elVals.y + elVals.height);
    }
  }
  const handleHoverEnd = () => {
    setShowCard(false);
  }
  
  return (
    <>
    { (showCard && currPrinciple) &&
      <PrincipleCard data={currPrinciple} left={left} top={top} dimensions={props.dimensions} />
    }
    <div className="principles-section">
      {/* <h5 className="i">How do we create climate-ready communities? We start by understanding the nine core principles for building solutions.</h5>
      <h2>9 Principles to lead the way</h2> */}
      <div className="principles-grid">
        {(principles.map(p => 
          <div key={p.id} className="principle" data-active={currPrinciple?.id === p.id && showCard} data-fade={currPrinciple?.id !== p.id && showCard}>
            <div className="item-row" data-hover onMouseOver={(e) => handleHover(e,p.id)} onMouseLeave={handleHoverEnd}>
              {p.icon({hover: true})}
              <h3 className="full-caps" data-hover>{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
export default Principles;