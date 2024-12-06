import styles from "./forgetpassinfo.module.css";
import { Link } from "react-router-dom";
function ForgetPassInfo() {
  return (
    <aside className={styles.aside}>
      <h1>Forget Password ?</h1>
      <p>No worries, we’ll send you reset instructions.</p>
      <div className={styles.orgEmail}>
        <label htmlFor="orgEmail" className={styles.orgLabel}>
          Organization Email
        </label>
        <input
          id="orgEmail"
          className={styles.orgInput}
          placeholder="example@gmail.com"
          name="orgEmail"
        />
      </div>
      <button className={styles.resetPass}>
        <Link to="reseTpassword">Reset Password</Link>
      </button>
      {/* shrouk => log in page  */}
      <Link to="">
        <img src="../../assets/icons/arrow.svg" /> Back to Log in
      </Link>
    </aside>
  );
}

export default ForgetPassInfo;
