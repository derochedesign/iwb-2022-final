import { projects } from "data/projects";
import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { useNavigate, UNSAFE_NavigationContext } from "react-router-dom";
import { useTitle } from "tools/useTitle";

const Interactive = props => {
  
  const navigate = useNavigate();
  const navigation = useContext(UNSAFE_NavigationContext).navigator;
  const [animReady, setAnimReady] = useState(false);
  useTitle("Exhibit")
  
  useLayoutEffect(() => {
    if (navigation) {
      navigation.listen((locationListener) => {
        if (locationListener.action === "POP") {
          document.body.style.overflowY = "auto";
          props.setCursor(true);
        }
      });
    }
  }, [navigation]);
  
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setAnimReady(true);
    props.setCursor(false);
    
  }, []);
  
  const handleBack = () => {
    //close popup
    document.body.style.overflowY = "auto";
    navigate(-1);
  }
  
  return (
    <section className="interactive project-pop" data-active={animReady}>
      <button data-pointer className="text" onClick={handleBack}>&#x2190;{" Back"}</button>
      <iframe width={"100%"} height={"100%"} src="https://my.matterport.com/show/?m=7mGVkVo8r6r" frameBorder="0" allowFullscreen allow="xr-spatial-tracking"></iframe>
    </section>
  )
}
export default Interactive;