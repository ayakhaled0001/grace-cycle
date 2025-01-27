import LogInImage from "../../components/login/LogInImage";
import AllDone from "../../components/login/AllDone";
function PasswordReseted() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <AllDone />
      <LogInImage />
    </div>
  );
}

export default PasswordReseted;
