import { Link } from "react-router-dom";
import styles from "./forgetpassinfo.module.css";
import BackToLogInBtn from "./BackToLogInBtn";
function AllDone() {
  return (
    <div className="aside">
      <h1 className={styles.h1}>All Done !</h1>
      <p className={styles.p}>
        Your password has been successfully reset. Click below to log in
        magically
      </p>
      <button className="resetPass" style={{ paddingTop: "15px" }}>
        <Link to="/" className="resetPassLink">
          Continue
        </Link>
      </button>
      <BackToLogInBtn />
    </div>
  );
}

export default AllDone;
