import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordReset from "./pages/log-in/PasswordReset";
import NewPassword from "./pages/log-in/NewPassword";
import PasswordReseted from "./pages/log-in/PasswordReseted";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes
        <Route index element={<HomePage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/OTP" element={<PasswordReset />} />
        <Route path="/setpassword" element={<NewPassword />} />
        <Route path="/PaswordReseted" element={<PasswordReseted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
