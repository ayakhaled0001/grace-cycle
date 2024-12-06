import LogInImage from "../../components/login/LogInImage";
import styles from "./forgetpassword.module.css";
function PasswordReset() {
  return (
    <div className={styles.container}>
      <OTP />
      <LogInImage />
    </div>
  );
}

export default PasswordReset;
