import styles from "./NewPassword.module.css";
import eye from "../../assets/icons/eye.svg";
function NewPasswordReset() {
  return (
    <aside className="aside">
      <h1>Set new Password</h1>
      <div className={styles.inputPass}>
        <label htmlFor="InputPass" className={styles.labelPass}>
          New Password
        </label>
        <input
          id="InputPass"
          className={styles.pass}
          placeholder="example123##anything"
          name="orgPass"
        />
        <img src={eye} className={styles.eye} alt="seen" />
      </div>
    </aside>
  );
}

export default NewPasswordReset;
