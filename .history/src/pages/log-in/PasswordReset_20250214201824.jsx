import LogInImage from "../../components/loginCom/LogInImage";
import OTP from "../../components/loginCom/OTP";
import styles from "./forgetpassword.module.css";
function PasswordReset() {
  return (
    <div className="flex">
      <OTP />
      <LogInImage />
    </div>
  );
}

export default PasswordReset;
