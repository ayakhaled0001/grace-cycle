import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
