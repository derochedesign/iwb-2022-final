import { FileIcon} from "components/Icons";
import { mainCopy } from "data/mainCopy";
import report from "download/IDS22-report.pdf";

const Footer = props => {
  return (
    <footer>
      <h2>{mainCopy.footer.title}</h2>
      {mainCopy.footer.body.map((f,i) => 
        <p key={i}>{f}</p>
      )}
      <div className="item-row center">
        <FileIcon />
        <h6>Download our Research Report <a href={report} download className="text">here</a> <span className="weight-light">(11MB)</span>.</h6>
      </div>
    </footer>
  )
}
export default Footer;