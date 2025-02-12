import styles from "./forgetpassinfo.module.css";
import BackToLogInBtn from "./BackToLogInBtn";
import { Link } from "react-router-dom";
function ForgetPassInfo() {
  return (
    <aside className="aside">
      <h1 className={styles.h1}>Forget Password ?</h1>
      <p className={styles.p}>No worries, we’ll send you reset instructions.</p>
      <div className={styles.orgEmail}>
        <label htmlFor="orgEmail" className={styles.orgLabel}>
          Organization Email
        </label>
        <input
          id="orgEmail"
          className={styles.orgInput}
          placeholder="example@gmail.com"
          name="orgEmail"
          type="email"
        />
      </div>
      <button className="resetPass" type="submit">
        <Link to="OTP" className="resetPassLink">
          Reset Password
        </Link>
      </button>
      {/* shrouk => log in page  */}
      <BackToLogInBtn />
    </aside>
  );
}

export default ForgetPassInfo;
