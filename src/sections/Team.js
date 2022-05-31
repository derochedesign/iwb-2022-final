import { useRef } from "react";

import daksh from "img/team/daksh.jpg";
import jenna from "img/team/jenna.jpg";
import migs from "img/team/miguel.jpg";
import jp from "img/team/jp.jpg";
import rebecca from "img/team/rebecca.jpg";
import shashank from "img/team/shashank.jpg";
import zan from "img/team/zan.jpg";

const Team = props => {
  
  const allTeamRowOne = [
    {img:daksh, name:"daksh gandhi", title:["Architect", "Design Strategist"], link:"https://www.linkedin.com/in/dakshgandhi/"},
    {img:jenna, name:"jenna rose storey", title:["Artist", "UX Researcher"], link:"https://www.linkedin.com/in/jennarosestorey/"},
    {img:migs, name:"joaquin (migs) topacio", title:["Industrial Designer", "Service Designer"], link:"https://www.linkedin.com/in/miguel-topacio/"},
    {img:jp, name:"josé pablo (jp) carrillo", title:["Brand & Packaging Designer", "Design Strategist"], link:"https://www.linkedin.com/in/jp-carrillo-artigas-a96861232/"},
  ];
  const allTeamRowTwo = [
    {img:rebecca, name:"rebecca arshawsky", title:["Urban Researcher", "Service Designer"], link:"https://www.linkedin.com/in/rebecca-arshawsky-6639b1176/"},
    {img:shashank, name:"shashank banawalikar", title:["Artist, Architect, Film", "Film Maker & Comedian"], link:"https://www.linkedin.com/in/shashank-banawalikar-5b7689223/"},
    {img:zan, name:"zan ding", title:["Life Scientist", "Design Researcher"], link:"https://www.linkedin.com/in/zan-ding-b18187218/"},
  ];
  
  return(
    <section className="team item-list-med">
      <h2>IDS '22 RESEARCH TEAM</h2>
    <div className="team-set">
      <div className="team-row">
        {allTeamRowOne.map((t,i) => 
          <TeamCard key={i} img={t.img} name={t.name} title={t.title} link={t.link} setImgLoaded={props.setImgLoaded} imgsCount={allTeamRowOne.length}/>
        )}
      </div>
      <div className="team-row">
        {allTeamRowTwo.map((t,i) => 
          <TeamCard key={i} img={t.img} name={t.name} title={t.title} link={t.link} setImgLoaded={props.setImgLoaded} imgsCount={allTeamRowTwo.length}/>
        )}
      </div>
    </div>
    </section>
  )
}

const TeamCard = props => {
  
  const imgsLoaded = useRef(0);
  
  const handleLoad = () => {
    const imgs = props.imgsCount;
    imgsLoaded.current = imgsLoaded.current + 1;
    if (imgsLoaded.current === imgs) props.setImgLoaded("team");
  }
  
  return (
    <div className="team-card">
      <a href={props.link} target="_blank" rel="noopener" data-pointer>
        <img src={props.img} alt={`${props.name} headshot`} onLoad={handleLoad} data-pointer/>
      </a>
      <a href={props.link} target="_blank" rel="noopener" data-pointer>
        <h4 className="name" data-pointer>{props.name}</h4>
      </a>
      {props.title.map((t,i) =>
        <p key={i} className="title small">{t}</p>
      )}
      
    </div>
  )
}
export default Team;