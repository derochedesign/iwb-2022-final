import { useEffect, useState } from "react";

const DisasterCard = props => {
  
  const [anim, setAnim] = useState(false);
  
  useEffect(() => {
    setAnim(true);
  }, []);
  
  return (
    <div className="card" data-active={anim}>
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
      </div>
    </div>
  )
}
export default DisasterCard;