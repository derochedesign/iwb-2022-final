import { mainCopy } from "data/mainCopy";
import { projects } from "data/projects";

const ProjectsIntro = props => {
  return (
    <section className="center-title center">
      <div className="center-title-inner item-list">
        <h2>{mainCopy.projectsIntro.title}</h2>
        <h4>{mainCopy.projectsIntro.body}</h4>
        <div className="three-col">
          {projects.map(p => 
            <div key={p.id} className="project-intro-stack">
              {p.icon()}
              <h1>{p.title}</h1>
              <h4>{p.sub}</h4>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default ProjectsIntro;