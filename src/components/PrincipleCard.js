import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";

const PrincipleCard = props => {
  
  const [anim, setAnim] = useState(false);
  
  const cardRef = useRef(null);
  const [left, setLeft] = useState(props.left);
  const [top, setTop] = useState(props.top);
  const leftOffsetAllowed = (props.dimensions?.width || document.body.offsetWidth)/15;
  const topOffsetAllowed = 24;
  
  const definePosition = () => {
    if (!isMobile) {
      let leftMost = cardRef.current.offsetWidth + props.left;
      let leftAvail = (props.dimensions?.width || document.body.offsetWidth) - leftOffsetAllowed;
      if (leftMost > leftAvail) {
        setLeft(props.left - (leftMost - leftAvail));
      }
    }
    else {
      setLeft("unset");
      setTop("unset");
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
    <div ref={cardRef} className="tooltip solid" data-active={anim} style={isMobile ? {transform:"translateX(-50%) translateY(-50%)",left:left, top:top} : {left:left, top:top}}>
      <div className="body item-list">
        <p>{props.data.body}</p>
        {/* TODO: actually close card when clicking on Close*/}
        {/* FIXME: For now, this trivially works because tapping anywhere closes the card */}
        { isMobile &&
          <button><h3>&#10005;</h3></button>
        }
      </div>
    </div>
  )
}
export default PrincipleCard;
