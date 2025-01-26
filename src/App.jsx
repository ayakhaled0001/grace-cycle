import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordReset from "./pages/log-in/PasswordReset";
import NewPassword from "./pages/log-in/NewPassword";
import PasswordReseted from "./pages/log-in/PasswordReseted";
import Signup from "./pages/signup/Signup";
import Login from './components/signup/Page_2'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/OTP" element={<PasswordReset />} />
        <Route path="/setpassword" element={<NewPassword />} />
        <Route path="/PaswordReseted" element={<PasswordReseted />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
