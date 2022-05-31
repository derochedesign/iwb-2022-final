import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";

const DefinitionCard = props => {
  
  const [anim, setAnim] = useState(false);
  
  const cardRef = useRef(null);
  const [left, setLeft] = useState(props.left*1.1);
  const [top, setTop] = useState(props.top);
  const leftOffsetAllowed = (props.dimensions?.width || document.body.offsetWidth)/15;
  const topOffsetAllowed = 24;
  
  const definePosition = () => {
    if (cardRef.current.offsetWidth + props.left > (props.dimensions?.width || document.body.offsetWidth) - leftOffsetAllowed) {
      setLeft(props.left - (props.width * 2.5));
    }
    if (cardRef.current.offsetHeight + (props.top - cardRef.current.offsetHeight/2) > (props.dimensions?.height || document.body.offsetHeight) - topOffsetAllowed) {
      setTop((props.dimensions?.height || document.body.offsetHeight)/2 - cardRef.current.offsetHeight/2);
    }
    else {
      setTop(props.top - cardRef.current.offsetHeight/2)
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
    <div ref={cardRef} className="tooltip solid light" data-active={anim} style={{left:left, top:top}}>
      <div className="body item-list">
        <img src={props.data.img} alt="definition" />
        <p>{props.data.body}</p>
        { isMobile &&
          <button style={{backgroundColor:'black'}}>Close</button>
        }
      </div>
    </div>
  )
}
export default DefinitionCard;
