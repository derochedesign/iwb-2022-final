import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";

const ConnectionCard = props => {
  
  const [anim, setAnim] = useState(false);
  const connections = props.data.to;
  
  const cardRef = useRef(null);
  const [left, setLeft] = useState(props.left);
  const [top, setTop] = useState(props.top);
  const leftOffsetAllowed = props.dimensions.width/15;
  const topOffsetAllowed = 24;

  const setCurrConnection = props.setCurrConnection;
  
  const definePosition = () => {
    
    if (cardRef.current.offsetWidth + props.left > props.dimensions.width - leftOffsetAllowed) {
      let el = document.getElementById(props.data.regionId);
      setLeft(props.left - el.getBoundingClientRect().width - cardRef.current.offsetWidth);
    }
    
    if (cardRef.current.offsetHeight + props.top > props.dimensions.height - topOffsetAllowed) {
      setTop(props.dimensions.height/2 - cardRef.current.offsetHeight/2);
    }
  }
  
  useEffect(() => {
    
    definePosition();
    
  }, [props.dimensions, cardRef]);
  
  useEffect(() => {
    setAnim(true);
    definePosition();
  }, []);
  

  return (
    <div ref={cardRef} className="tooltip" data-active={anim} style={{left:left, top:top}}>
      <div className="body item-list">
        <div className="item-row">
          <h4>{props.data.name}</h4>
          <h4><span className="i">{props.data.total} Migrants</span></h4>
        </div>
        <div className="item-list-small">
          <h6>Migration Patterns</h6>
          { connections.map(c => 
            <p key={c.regionId}>{c.name} - <span>{c.migrants} Migrants</span></p>
          )}
        </div>
        { isMobile &&
          <button style={{backgroundColor:'black'}} 
          onClick={() => setCurrConnection(null)}>Close</button>
        }
      </div>
    </div>
  )
}
export default ConnectionCard;
