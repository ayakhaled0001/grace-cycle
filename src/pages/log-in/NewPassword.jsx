import LogInImage from "../../components/login/LogInImage";
import NewPasswordReset from "../../components/login/NewPasswordReset";
function NewPassword() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <NewPasswordReset />
      <LogInImage />
    </div>
  );
}

export default NewPassword;
