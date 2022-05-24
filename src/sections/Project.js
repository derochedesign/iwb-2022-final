import { projects } from "data/projects";
import { useParams } from "react-router-dom";

const Project = props => {
  
  const {projId} = useParams();
  
  const data = projects.find(p => p.slug === projId)?.data;
  
  if (!data) return null
  else
  return (
    <div className="project-pop">
      <div className="project-inner">
        <ProjectHeader />
        <section className="right-item-layout">
          <div className="item-list-small">
            <h1>{data.title}</h1>
            <h3>{data.sub}</h3>
          </div>
        </section>
        <section className="item-list-small">
          <h4>{data.intro.title}</h4>
          { data.intro.body.map((p,i) =>
            <p key={i}>{p}</p>
          )}
        </section>
      </div>
    </div>
  )
}

const ProjectHeader = props => {
  return (
    <div></div>
  )
}

export default Project;