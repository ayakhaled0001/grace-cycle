import styles from "./NewPassword.module.css";
import eye from "../../assets/icons/eye.svg";
import { Link } from "react-router-dom";
import BackToLogInBtn from "./BackToLogInBtn";
import { useState } from "react";
function NewPasswordReset() {
  const [inputType, setInputType] = useState("password");

  // Handlers to toggle input type
  const showPassword = () => setInputType("text");
  const hidePassword = () => setInputType("password");
  return (
    <aside className="aside">
      <h1 className={styles.paddingB}>Set new Password</h1>
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
            type={inputType}
          />
          <img
            src={eye}
            className={styles.eye}
            alt="seen"
            onMouseEnter={showPassword}
            onMouseLeave={hidePassword}
          />
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
            type={inputType}
          />
          <img
            src={eye}
            className={styles.eye}
            alt="seen"
            onMouseEnter={showPassword}
            onMouseLeave={hidePassword}
          />
        </div>
      </div>
      <button className="resetPass">
        <Link to="/PaswordReseted" className="resetPassLink">
          Reset Password
        </Link>
      </button>
      <BackToLogInBtn />
    </aside>
  );
}

export default NewPasswordReset;
