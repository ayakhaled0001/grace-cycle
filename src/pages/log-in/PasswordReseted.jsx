import LogInImage from "../../components/loginCom/LogInImage";
import AllDone from "../../components/loginCom/AllDone";
function PasswordReseted() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <AllDone />
      <LogInImage />
    </div>
  );
}

export default PasswordReseted;
