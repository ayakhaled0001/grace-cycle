import styles from "./forgetpassinfo.module.css";
function AllDone() {
  return (
    <div className="aside">
      <h1 className={styles.h1}>All Done !</h1>
      <p className={styles.p}>
        Your password has been successfully reset. Click below to log in
        magically
      </p>
      <button className="resetPass">
        <Link to="/" className="resetPassLink">
          Reset Password
        </Link>
      </button>
    </div>
  );
}

export default AllDone;
