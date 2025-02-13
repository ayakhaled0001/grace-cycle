import styles from "./NewPassword.module.css";
function NewPasswordReset() {
  return (
    <aside className="aside">
      <h1>Set new Password</h1>
      <div className={styles.}>
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
    </aside>
  );
}

export default NewPasswordReset;
