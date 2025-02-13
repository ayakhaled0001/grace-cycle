import ForgetPassInfo from "../../components/loginCom/ForgetPassInfo";
import LogInImage from "../../components/loginCom/LogInImage";
import styles from "./forgetpassword.module.css";
import "./forgetpassword.module.css";
function ForgetPassword() {
  return (
    <div className={styles.container}>
      <ForgetPassInfo />
      <LogInImage />
    </div>
  );
}

export default ForgetPassword;
