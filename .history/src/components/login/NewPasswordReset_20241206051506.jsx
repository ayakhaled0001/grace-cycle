import styles from "./NewPassword.module.css";
import eye from "../../assets/icons/eye.svg";
import insideInputPassword from "./insideInputPassword";
function NewPasswordReset() {
  return (
    <aside className="aside">
      <h1>Set new Password</h1>
      <div className={styles.inputPass}>
        <label htmlFor="orgEmail" className={styles.labelPass}>
          New Password
        </label>
        <div className={styles.pass}>
          <input
            id="orgEmail"
            className={styles.pass}
            placeholder={insideInputPassword}
            name="orgEmail"
          />
        </div>
      </div>
    </aside>
  );
}

export default NewPasswordReset;
