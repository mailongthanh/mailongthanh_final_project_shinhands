import "./logo.scss";
import kanrisha_logo from "../../../assets/kanrisha_shorten-removebg.png";

function Logo(props) {
  return (
    <div className="Logo">
      <img src={kanrisha_logo} alt="" width="100%" height="100%" />
    </div>
  );
}

export default Logo;
