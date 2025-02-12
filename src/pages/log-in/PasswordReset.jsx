import LogInImage from "../../components/loginCom/LogInImage";
import OTP from "../../components/loginCom/OTP";

function PasswordReset() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <OTP />
      <LogInImage />
    </div>
  );
}

export default PasswordReset;
