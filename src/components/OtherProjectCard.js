import React, { useEffect, useState, useRef } from "react";
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
    let _left = props.left;
    let _top = props.dimensions.height / 2 - cardRef.current.offsetHeight / 2;
    
    if (cardRef.current.offsetWidth + props.left > props.dimensions.width - leftOffsetAllowed) {
      let el = document.getElementById(props.data[0].regionId);
      _left = props.left - el.getBoundingClientRect().width - cardRef.current.offsetWidth;
    }
    setLeft(_left);
    setTop(_top);
  }
  
  const handleProject = ind => {
    setCurrProject(props.data[ind]);
  }
  
  useEffect(() => {
    if (!currProject) {
      definePosition();
    }
  },[currProject])
  

  useEffect(() => {
    definePosition();
  }, [props.dimensions, cardRef, props.data]);

  useEffect(() => {
    setAnim(true);
    definePosition();
    document.body.style.overflowY = "hidden";
    if (props.data.length === 1) {
      handleProject(0);
    }
  }, []);
  
  useEffect(() => () => {
    document.body.style.overflowY = "auto";
  }, []);


  return (
    <div ref={cardRef} className={`card wide ${!currProject ? "list" : ""}`} data-active={anim} style={{ left: left, top: top-5 }}>
      {currProject && <InnerCard solo={props.data.length === 1} updatePos={definePosition} data={currProject} setCurrProject={setCurrProject} handleExit={() => props.closeCard()} set />}
      {!currProject &&
        <>
        <div className="body">
          <ul style={{gridTemplateRows: `repeat(${props.data.length}, 1fr)`}}>
            {(props.data.map((d,i) => 
              <li key={i}>
                <button data-pointer className="project-list-item right-item-layout" 
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
        <button data-pointer className="abs" onClick={() => props.closeCard()}><h3>&#10005;</h3></button>
        </>
      }
    </div>
  )
}

const InnerCard = props => {
  
  const handleBack = () => {
    props.setCurrProject(null);
  }
  
  useEffect(() => {
    props.updatePos();
    setTimeout(() => {
      props.updatePos();
    },100);
  }, []);
  
  return (
    <>
      <div className="hero-image">
        <img src={`/images/otherProjects/${props.data.id}/image.jpg`} alt={props.data.title} />
      </div>
      <div className="title-bar item-list-small">
        <h3>{props.data.title}</h3>
        <div className="item-row">
          <p>{props.data.location}</p>
          <p> | </p>
          <p>{props.data.year}</p>
        </div>
      </div>
      <div className="header-bar item-row wrap">
        {props.data.principles.map(p =>
          <div title={p.name} key={p.id}>
            {p.icon(false)}
          </div>
        )}
      </div>
      <div className="body item-list">
        <p>{props.data.body[0]}</p>
        <a className="text" href={props.data.link} target="_blank" rel="noopener">Learn More</a>
        {!props.solo
        ?
        <div className="button-row">
          <button onClick={handleBack}>&#8592; Back</button>
          <button className="secondary" onClick={props.handleExit}><h3>&#10005;</h3></button>
        </div>
        :
        <button className="secondary" onClick={props.handleExit}><h3>&#10005;</h3></button> }
      </div>
    </>
  )
}

export default OtherProjectCard;
