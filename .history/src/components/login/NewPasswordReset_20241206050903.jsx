import styles from "./NewPassword.module.css";
import eye from "../../assets/icons/eye.svg";
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
            placeholder="example123##anything"
            name="orgEmail"
          />
          <span>
            <img src="../../assets/icons/eye.svg" />
          </span>
        </div>
      </div>
    </aside>
  );
}

export default NewPasswordReset;
