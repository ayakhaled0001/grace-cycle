import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { Routes, Route } from "react-router-dom";

function App() {
  <browserRouter>
    <Routes>
      <Route path="/" element={<ForgetPassword />} />
    </Routes>
  </browserRouter>;
  return <ForgetPassword />;
}

export default App;
