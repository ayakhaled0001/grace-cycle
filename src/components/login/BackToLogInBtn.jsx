import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
function BackToLogInBtn() {
  return (
    <Link to="" className="backToLink">
      <img src={arrow} /> Back to Log in
    </Link>
  );
}

export default BackToLogInBtn;
