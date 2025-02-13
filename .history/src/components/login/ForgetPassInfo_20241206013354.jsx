import styles from "./forgetpassinfo.module.css";
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
      <button className={styles.resetPass}>Reset Password</button>
    </aside>
  );
}

export default ForgetPassInfo;
