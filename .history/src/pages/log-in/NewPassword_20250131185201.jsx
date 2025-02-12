import LogInImage from "../../components/loginCom/LogInImage";
import NewPasswordReset from "../../components/loginCom/NewPasswordReset";
import styles from "./forgetpassword.module.css";
function NewPassword() {
  return (
    <div className={styles.container}>
      <NewPasswordReset />
      <LogInImage />
    </div>
  );
}

export default NewPassword;
