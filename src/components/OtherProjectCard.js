import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";
import { ArrowHeadIcon } from "./Icons";

const OtherProjectCard = props => {

  const [anim, setAnim] = useState(false);

  const cardRef = useRef(null);
  const [left, setLeft] = useState(props.left);
  const [top, setTop] = useState(props.top);
  const [currProject, setCurrProject] = useState(null);
  const leftOffsetAllowed = props.dimensions.width / 15;
  const topOffsetAllowed = 24;

  const definePosition = () => {

    // if (cardRef.current.offsetWidth + props.left > props.dimensions.width - leftOffsetAllowed) {
    //   let el = document.getElementById(props.data[0].regionId);
    //   setLeft(props.left - el.getBoundingClientRect().width - cardRef.current.offsetWidth);
    // }

    if (cardRef.current.offsetHeight + props.top > props.dimensions.height - topOffsetAllowed) {
      setTop(props.dimensions.height / 2 - cardRef.current.offsetHeight / 2);
    }
  }
  
  const handleProject = ind => {
    setCurrProject(props.data[ind]);
  }

  useEffect(() => {
    definePosition();
  }, [props.dimensions, cardRef]);

  useEffect(() => {
    setAnim(true);
    definePosition();
  }, []);


  return (
    <div ref={cardRef} className="card list" data-active={anim} style={{ left: left, top: top }}>
      {currProject && <InnerCard data={currProject} setCurrProject={setCurrProject} />}
      {!currProject &&
        <div className="body">
          <ul style={{gridTemplateRows: `repeat(${props.data.length}, 1fr)`}}>
            {(props.data.map((d,i) => 
              <li key={i}>
                <button className="project-list-item right-item-layout" 
                  onClick={() => handleProject(i)}
                > 
                  <div className="item-list-small">
                    <h3>{d.title}</h3>
                    <div className="item-row">
                      <h5>{d.location}</h5>
                      <h5>{d.year}</h5>
                    </div>
                  </div>
                  <ArrowHeadIcon />
                  <img src={`/images/otherProjects/${d.id}/image.jpg`} alt={d.title} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

const InnerCard = props => {
  
  const handleBack = () => {
    props.setCurrProject(null);
  }
  
  return (
    <>
      <div className="hero-image">
        <img src={`/images/otherProjects/${props.data.id}/image.jpg`} alt={props.data.title} />
      </div>
      <div className="header-bar item-row">
        {props.data.principles.map(p =>
          <p key={p.id}>{p.name}</p>
        )}
      </div>
      <div className="body item-list-small">
        <button className="text" onClick={handleBack}>Back</button>
        <p>{props.data.body[0]}</p>
        {/* TODO: actually close card when clicking on Close*/}
        {/* FIXME: For now, this trivially works because tapping anywhere closes the card */}
        {isMobile &&
          <button style={{ backgroundColor: 'black' }}>Close</button>
        }
      </div>
    </>
  )
}

export default OtherProjectCard;
