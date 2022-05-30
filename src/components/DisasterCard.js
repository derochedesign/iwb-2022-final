import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

const DisasterCard = props => {
  
  const [anim, setAnim] = useState(false);
  const cardRef = useRef(null);
  const [left, setLeft] = useState(props.left);
  const [top, setTop] = useState(props.top);
  const leftOffsetAllowed = props.dimensions.width/15;
  const topOffsetAllowed = 24;

  const setCurrDisaster = props.setCurrDisaster;
  
  const definePosition = () => {
    
    if (cardRef.current.offsetWidth + props.left > props.dimensions.width - leftOffsetAllowed) {
      setLeft(props.left - (cardRef.current.offsetWidth));
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
    <div ref={cardRef} className="card" data-active={anim} style={{left:left, top:top}}>
      <div className="hero-image">
        <img src={`/images/disasters/${props.data.id}/image.jpg`} alt={props.data.title} />
      </div>
      <div className="header-bar item-list-small">
        <h4>Approx. Displaced:</h4>
        <h3>{props.data.displaced}</h3>
      </div>
      <div className="body item-list-small">
        <h3>{props.data.title}</h3>
        <div className="item-row">
          <h5>{props.data.location}</h5>
          <h5>{props.data.year}</h5>
        </div>
        <p>"{props.data.quote}"</p>
        { isMobile &&
          <button style={{backgroundColor:'black'}}
          onClick={() => setCurrDisaster(null)}>Close</button>
        }
      </div>
    </div>
  )
}
export default DisasterCard;
