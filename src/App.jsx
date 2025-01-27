import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordReset from "./pages/log-in/PasswordReset";
import NewPassword from "./pages/log-in/NewPassword";
import PasswordReseted from "./pages/log-in/PasswordReseted";
import Login from "./pages/log-in/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home";


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
        {/* <Route path="/" element={<Home/>} /> */}
        {/* <Route path="/setPassword" element={<NewPassword />} />
        <Route path="/passwordReseted" element={<PasswordReseted />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
