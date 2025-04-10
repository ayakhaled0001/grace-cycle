import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordReset from "./pages/log-in/PasswordReset";
import NewPassword from "./pages/log-in/NewPassword";
import PasswordReseted from "./pages/log-in/PasswordReseted";
import Login from "./pages/log-in/Login";
import Signup from "./pages/signup/Signup";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact-us/ContactUs";
import AboutUs from "./pages/about/AboutUs";
import CharityPage from "./pages/charity/CharityPage";
import GlobalLoader from "./components/loadersCom/GlobalLoader";

function App() {
  const [loading, setLoading] = useState(true); // Starts true on first mount

  useEffect(() => {
    // Run after everything is loaded
    const onReady = () => {
      setTimeout(() => setLoading(false), 0);
    };

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady);
      return () => window.removeEventListener("load", onReady);
    }
  }, []);
  return loading ? (
    <GlobalLoader />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<CharityPage />} />
        <Route path="/OTP" element={<PasswordReset />} />
        <Route path="/setpassword" element={<NewPassword />} />
        <Route path="/PasswordReseted" element={<PasswordReseted />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
