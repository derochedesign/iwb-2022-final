import { mainCopy } from "data/mainCopy";
import { projects } from "data/projects";
import { useRef } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

const ProjectsIntro = props => {
  
  // const ref = props.projectsRef && props.projectsRef.current;
  
  return (
    <section className="center-title center">
      <div className="center-title-inner item-list-large">
        <div className="item-list center">
          <h2>{mainCopy.projectsIntro.title}</h2>
          <h4>{mainCopy.projectsIntro.body}</h4>
        </div>
        <div className="three-col">
          {projects.map(p => 
            <div key={p.id} className="project-intro-stack">
              {p.icon()}
              <h2>{p.title}</h2>
              <h4>{p.sub}</h4>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default ProjectsIntro;