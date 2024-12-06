import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
