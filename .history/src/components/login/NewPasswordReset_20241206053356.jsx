import styles from "./NewPassword.module.css";
import eye from "../../assets/icons/eye.svg";
import { Link } from "react-router-dom";
function NewPasswordReset() {
  return (
    <aside className="aside">
      <h1>Set new Password</h1>
      <div className={styles.inputPass}>
        <label htmlFor="InputPass" className={styles.labelPass}>
          New Password
        </label>
        <div className={styles.positioned}>
          <input
            id="InputPass"
            className={styles.pass}
            placeholder="example123##anything"
            name="orgPass"
          />
          <img src={eye} className={styles.eye} alt="seen" />
        </div>
      </div>
      <div className={styles.inputPass}>
        <label htmlFor="InputPassConfirm" className={styles.labelPass}>
          Confirm Password
        </label>
        <div className={styles.positioned}>
          <input
            id="InputPassConfirm"
            className={styles.pass}
            placeholder="example123##anything"
            name="orgPass"
          />
          <img src={eye} className={styles.eye} alt="seen" />
        </div>
      </div>
      <button className="resetPass">
        <Link to="/setpassword" className="resetPassLink">
          Reset Password
        </Link>
      </button>
    </aside>
  );
}

export default NewPasswordReset;
