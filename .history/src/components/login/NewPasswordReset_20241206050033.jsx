import styles from "./NewPassword.module.css";
function NewPasswordReset() {
  return (
    <aside className="aside">
      <h1>Set new Password</h1>
      <div className={styles.inputPass}>
        <label htmlFor="orgEmail" className={styles.labelPass}>
          Organization Email
        </label>
        <input
          id="orgEmail"
          className={styles.pass}
          placeholder="example@gmail.com"
          name="orgEmail"
        />
      </div>
    </aside>
  );
}

export default NewPasswordReset;
