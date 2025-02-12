import LogInImage from "../../components/loginCom/LogInImage";
import AllDone from "../../components/loginCom/AllDone";
import styles from "./forgetpassword.module.css";
function PasswordReseted() {
  return (
    <div className={styles.container}>
      <AllDone />
      <LogInImage />
    </div>
  );
}

export default PasswordReseted;
