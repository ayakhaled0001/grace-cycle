import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordReset from "./pages/log-in/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForgetPassword />} />
        <Route path="/OTP" element={<PasswordReset />} />
        <Route path=
      </Routes>
    </BrowserRouter>
  );
}

export default App;
