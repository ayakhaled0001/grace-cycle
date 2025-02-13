import styles from "./forgetpassinfo.module.css";
function ForgetPassInfo() {
  return (
    <aside className={styles.aside}>
      <h1>Forget Password ?</h1>
      <p>No worries, we’ll send you reset instructions.</p>
      <div className={styles.orgEmail}>
        <label for="orgEmail" className="">
          Organization Email
        </label>
        <input />
      </div>
    </aside>
  );
}

export default ForgetPassInfo;
