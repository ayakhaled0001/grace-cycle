import ForgetPassInfo from "../../components/loginCom/ForgetPassInfo";
import LogInImage from "../../components/loginCom/LogInImage";
import "./forgetpassword.module.css";
function ForgetPassword() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <ForgetPassInfo />
      <LogInImage />
    </div>
  );
}

export default ForgetPassword;
