import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";

const OtherProjectCard = props => {
  
  const [anim, setAnim] = useState(false);
  
  const cardRef = useRef(null);
  const [left, setLeft] = useState(props.left);
  const [top, setTop] = useState(props.top);
  const leftOffsetAllowed = props.dimensions.width/15;
  const topOffsetAllowed = 24;
  
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
    <div ref={cardRef} className="card" data-active={anim} style={{left:left, top:top}}>
      <div className="hero-image">
        <img src={`/images/otherProjects/${props.data.id}/image.jpg`} alt={props.data.title} />
      </div>
      <div className="header-bar item-row">
        { props.data.principles.map(p => 
          <p key={p.id}>{p.name}</p>
        )}
      </div>
      <div className="body item-list-small">
        <h3>{props.data.title}</h3>
        <div className="item-row">
          <h5>{props.data.location}</h5>
          <h5>{props.data.year}</h5>
        </div>
        <p>{props.data.body[0]}</p>
        {/* TODO: actually close card when clicking on Close*/}
        {/* FIXME: For now, this trivially works because tapping anywhere closes the card */}
        { isMobile &&
          <button style={{backgroundColor:'black'}}>Close</button>
        }
      </div>
    </div>
  )
}
export default OtherProjectCard;
