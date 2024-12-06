import ForgetPassInfo from "../../components/login/ForgetPassInfo";
import styles from "./forgetpassword.module.css";
import LogInImage from "../../components/login/LogInImage";

function ForgetPassword() {
  return (
    <div className={styles.container}>
      <ForgetPassInfo />
      <LogInImage />
    </div>
  );
}

export default ForgetPassword;
