import LogInImage from "../../components/loginCom/LogInImage";
import NewPasswordReset from "../../components/loginCom/NewPasswordReset";
function NewPassword() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <NewPasswordReset />
      <LogInImage />
    </div>
  );
}

export default NewPassword;
