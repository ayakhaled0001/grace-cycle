import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
function BackToLogInBtn() {
  return (
    <Link
      to=""
      className="absolute -bottom-10 flex gap-x-3 right-1/2 font-bold text-btnsGreen ">
      <img src={arrow} /> Back to Log in
    </Link>
  );
}

export default BackToLogInBtn;
