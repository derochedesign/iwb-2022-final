import { LogoIcon, ProjectOneUserIcon } from "components/Icons";
import { projects } from "data/projects";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

const Project = props => {
  
  const {projId} = useParams();
  const navigate = useNavigate();
  const data = projects.find(p => p.slug === projId)?.data;
  const testImage = false;
  const testImageUri = "/images/projects/test.png";
  const [lightboxActive, setLightboxActive] = useState(false);
  const [animReady, setAnimReady] = useState(false);
  const [currImage, setCurrImage] = useState();
  const imageUri = `/images/projects/${data.slug}/`;
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    let root = document.documentElement;
    root.style.setProperty('--colour-proj-main', data.colours[0]);
    root.style.setProperty('--colour-proj-dark', data.colours[1]);
    root.style.setProperty('--colour-proj-light', data.colours[2]);
    
    setAnimReady(true);
    
  }, []);
  
  useEffect(() => {
    if(currImage) {
      setLightboxActive(true);
    }
  }, [currImage]);
  
  useEffect(() => {
    if(!lightboxActive) {
      setCurrImage(null);
    }
  }, [lightboxActive]);
  
  const handleBack = () => {
    //close popup
    document.body.style.overflow = "auto";
    navigate(-1);
  }
  
  if (!data) return null
  else
  return (
      <div className="project-pop" data-active={animReady}>
        {lightboxActive && <Lightbox 
          mainSrc={currImage}
          onCloseRequest={() => setLightboxActive(false)}
        />}
        <ProjectHeader handleBack={handleBack} />
        <div className="project-container">
          <div className="project-inner">
            <section className="right-item-layout header">
              <div className="item-list-small">
                <h1 className="hero-text">{data.title}</h1>
                <h3 className="hero-text">{data.sub}</h3>
              </div>
              {data.logo()}
            </section>
            
            <section className="item-list intro">
              <h2>{data.intro.title}</h2>
              { data.intro.body.map((p,i) =>
                <p key={i}>{p}</p>
              )}
            </section>
            
            <section className="item-list user">
              <h2>{data.user.title}</h2>
              <h4>{data.user.subtitle}</h4>
              <div className="img-info-list" data-tall={data.slug === "heal"}>
                {data.user.img()}
                <ul>
                  { data.user.points.map((p,i) =>
                    <li key={i}><p>{p}</p></li>
                  )}
                </ul>
              </div>
              <h4>{data.sectionTitle}</h4>
              { data.user.body.map((p,i) =>
                <p key={i}>{p}</p>
              )}
            </section>
            
            <section className="hero-img">
              <ImageCont src={ testImage ? testImageUri : imageUri + data.diagram} alt={data.diagramLabel} handleClick={() => setCurrImage(imageUri + data.diagram)} label={data.diagramLabel} />
            </section>
            
            <section className="item-list services">
              <h2>{data.services.title}</h2>
              <div className="three-col">
              { data.services.cols.map((c,i) =>
                <div key={i} className="item-list">
                  <div className="img-cont">
                    {c.img()}
                  </div>
                  <h3 className="weight-bold">{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              )}
              </div>
            </section>
            
            <section className="item-list principles">
              <h2>{data.principles.title}</h2>
              <div className="three-col">
                { data.principles.cols.map((c,i) =>
                  <div key={i} className="item-list">
                    <div className="img-cont">
                      {c.img(false)}
                    </div>
                    <h3 className="width-min">{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                )}
              </div>
            </section>
            
            <section className="item-list closing">
              <h2>{data.closing.title}</h2>
              { data.closing.body.map((p,i) =>
                <p key={i}>{p}</p>
              )}
              <ImageCont src={ testImage ? testImageUri : imageUri + data.closing.img} alt={data.closing.imgLabel} handleClick={() => setCurrImage(imageUri + data.closing.img)} label={data.closing.imgLabel} />
            </section>
            
            <section className="item-list-small case-study">
              <h2>{data.casestudy.title}</h2>
              <h4 className="hero-text">{data.casestudy.subtitle}</h4>
              
              <ImageCont src={ testImage ? testImageUri : imageUri + data.casestudy.heroImg} alt={data.casestudy.title} handleClick={() => setCurrImage(imageUri + data.casestudy.heroImg)} label={data.casestudy.imgLabel} />
              <div className="item-list info">
                { data.casestudy.body.map((p,i) =>
                  <p key={i}>{p}</p>
                )}
                <h3 className="standout-text hero-text">{data.casestudy.article}</h3>
                { data.casestudy.bodyOut.map((p,i) =>
                  <p key={i}>{p}</p>
                )}
              </div>
              { (data.casestudy.imgs) && data.casestudy.imgs.map((img,i) =>
                <ImageCont src={ testImage ? testImageUri : imageUri + img.name} alt={img.label} handleClick={() => setCurrImage(imageUri + img.name)} label={img.label} />
              )}
            </section>
            
            <section className="item-list">
              <h3>Sources</h3>
              <div className="item-list-small">
                {data.sources.map((s,i) =>
                  <a className="text" key={i} href={s.link} target="_blank" rel="noopener">
                    {s.title}
                  </a>
                )}
              </div>
            </section>
            
          </div>
        </div>
      </div>
  )
}

const ProjectHeader = ({handleBack}) => {
  
  return (
    <div className="project-header item-list">
      <LogoIcon />
      <button data-pointer className="text" onClick={handleBack}>&#x2190;{" Back"}</button>
    </div>
  )
}

const ImageCont = props => {
  return (
    <div className="image-container">
      <img data-pointer className="img-full"
        src={props.src} 
        alt={props.alt} 
        onClick={props.handleClick} 
      />
      <h6>{props.label}</h6>
    </div>
  )
}

export default Project;