import { LogoIcon } from "components/Icons";
import { projects } from "data/projects";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Project = props => {
  
  const {projId} = useParams();
  
  const data = projects.find(p => p.slug === projId)?.data;
  const testImage = true;
  const testImageUri = "/images/projects/test.png";
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    let root = document.documentElement;
    root.style.setProperty('--colour-proj-main', data.colours[0]);
    root.style.setProperty('--colour-proj-dark', data.colours[1]);
    root.style.setProperty('--colour-proj-light', data.colours[2]);
    
  }, []);
  
  const handleBack = () => {
    //close popup
    document.body.style.overflow = "auto";
  }
  
  if (!data) return null
  else
  return (
    <div className="project-pop">
      <div className="project-container">
        <div className="project-inner">
          <ProjectHeader handleBack={handleBack} />
          <section className="right-item-layout header">
            <div className="item-list-small">
              <h1>{data.title}</h1>
              <h3>{data.sub}</h3>
            </div>
          </section>
          
          <section className="item-list-small intro">
            <h4>{data.intro.title}</h4>
            { data.intro.body.map((p,i) =>
              <p key={i}>{p}</p>
            )}
          </section>
          
          <section className="item-list-small user">
            <h2>{data.user.title}</h2>
            <h4>{data.user.subtitle}</h4>
            <img src={ testImage ? testImageUri : data.user.img} alt="user"/>
            <ul>
              { data.user.points.map((p,i) =>
                <li key={i}><p>{p}</p></li>
              )}
            </ul>
            <h4>{data.sectionTitle}</h4>
            { data.user.body.map((p,i) =>
              <p key={i}>{p}</p>
            )}
          </section>
          
          <section className="hero-img">
            <img src={ testImage ? testImageUri : data.diagram} alt="" />
          </section>
          
          <section className="item-list-small services">
            <h2>{data.services.title}</h2>
            <div className="three-col">
            { data.services.cols.map((c,i) =>
              <div key={i} className="item-list">
                <img src={ testImage ? testImageUri : c.img} alt={c.title} />
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            )}
            </div>
          </section>
          
          <section className="item-list-small principles">
            <h2>{data.principles.title}</h2>
            <div className="three-col">
              { data.principles.cols.map((c,i) =>
                <div key={i} className="item-list">
                  <img src={ testImage ? testImageUri : c.img} alt={c.title} />
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                </div>
              )}
            </div>
          </section>
          
          <section className="item-list-small closing">
            <h4>{data.closing.title}</h4>
            { data.closing.body.map((p,i) =>
              <p key={i}>{p}</p>
            )}
            <img src={ testImage ? testImageUri : data.closing.img} alt={data.closing.title} />
          </section>
          
          <section className="item-list-small case-study">
            <h2>{data.casestudy.title}</h2>
            <h4>{data.casestudy.subtitle}</h4>
            <img src={ testImage ? testImageUri : data.casestudy.heroImg} alt={data.casestudy.title} />
            { data.casestudy.body.map((p,i) =>
              <p key={i}>{p}</p>
            )}
            <h3>{data.casestudy.article}</h3>
            { data.casestudy.imgs.map((img,i) =>
              <img key={i} src={ testImage ? testImageUri : img} alt={"case study"} />
            )}
          </section>
          
        </div>
      </div>
    </div>
  )
}

const ProjectHeader = ({handleBack}) => {
  
  const testImage = true;
  const testImageUri = "/images/projects/test.png";
  
  return (
    <div className="project-header item-list-small">
      <LogoIcon />
      <button className="text" onClick={handleBack}>{"< Back"}</button>
    </div>
  )
}

export default Project;