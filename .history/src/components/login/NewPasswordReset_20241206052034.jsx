import styles from "./NewPassword.module.css";
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
        <img src={eye} />
      </div>
    </aside>
  );
}

export default NewPasswordReset;
