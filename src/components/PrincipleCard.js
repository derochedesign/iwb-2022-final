import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";

const PrincipleCard = props => {
  
  const [anim, setAnim] = useState(false);
  
  const cardRef = useRef(null);
  const [left, setLeft] = useState(props.left);
  const leftOffsetAllowed = props.dimensions.width/15;
  const topOffsetAllowed = 24;
  
  const definePosition = () => {
    let leftMost = cardRef.current.offsetWidth + props.left;
    let leftAvail = props.dimensions.width - leftOffsetAllowed;
    if (leftMost > leftAvail) {
      setLeft(props.left - (leftMost - leftAvail));
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
    <div ref={cardRef} className="tooltip solid" data-active={anim} style={{left:left, top:props.top}}>
      <div className="body item-list">
        <p>{props.data.body}</p>
        {/* TODO: actually close card when clicking on Close*/}
        {/* FIXME: For now, this trivially works because tapping anywhere closes the card */}
        { isMobile &&
          <button style={{backgroundColor:'black'}}>Close</button>
        }
      </div>
    </div>
  )
}
export default PrincipleCard;
