import LogInImage from "../../components/login/LogInImage";
import OTP from "../../components/login/OTP";

function PasswordReset() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <OTP />
      <LogInImage />
    </div>
  );
}

export default PasswordReset;
