import "./styles/App.css";
import ForgetPassword from "./pages/log-in/ForgetPassword";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PasswordReset from "./pages/log-in/PasswordReset";
import NewPassword from "./pages/log-in/NewPassword";
import PasswordReseted from "./pages/log-in/PasswordReseted";
import Login from "./pages/log-in/Login";
import Signup from "./pages/signup/Signup";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact-us/ContactUs";
import AboutUs from "./pages/about/AboutUs";
import CharityPage from "./pages/charity/CharityPage";
import VendorPage from "./pages/vendor/VendorPage";
import Overview from "./components/vendorCom/Overview";
import AddNewItem from "./components/vendorCom/AddNewItem";
import MyListings from "./components/vendorCom/MyListings";
import Orders from "./components/vendorCom/Orders";
import Settings from "./components/vendorCom/Settings";
import AddToCart from "./pages/charity/AddToCart";
import CartPage from "./pages/charity/CartPage";
import CartDetailsPage from "./pages/charity/CartDetailsPage";
import FavoriteItemsPage from "./pages/charity/FavoriteItemsPage";
import MagicBagsInfo from "./pages/charity/MagicBagsInfo";
import VendorDetails from "./pages/charity/VendorDetails";
import CharityProfile from "./components/charityCom/CharityProfile";
import AddNewBag from "./components/vendorCom/AddNewBag";
import PublicServicesPage from "./pages/home/PublicServicesPage";
import PaymentPage from "./pages/charity/PaymentPage";
import OrderSuccess from "./pages/charity/order-success";
// import GlobalLoader from "./components/loadersCom/GlobalLoader";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CharityPage" element={<CharityPage />}>
            <Route path="cart" element={<CartPage />} />
            <Route
              path="cart/details/:restaurantId"
              element={<CartDetailsPage />}
            />
            <Route path="cart/:dishId" element={<AddToCart />} />
            <Route path="magicbags/:bagId" element={<MagicBagsInfo />} />
            <Route path="vendor/:vendorId" element={<VendorDetails />} />
          </Route>
          <Route path="/CharityPage/payment" element={<PaymentPage />} />
          <Route path="/CharityPage/order-success" element={<OrderSuccess />} />
          <Route path="/favorites" element={<FavoriteItemsPage />} />
          <Route path="/charityProfile" element={<CharityProfile />} />
          <Route path="/PublicServicesPage" element={<PublicServicesPage />} />

          <Route path="/VendorPage" element={<VendorPage />}>
            <Route path="overview" element={<Overview />} />
            <Route path="addNewItem" element={<AddNewItem />} />
            <Route path="addNewBag" element={<AddNewBag />} />
            <Route path="myListings" element={<MyListings />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/OTP" element={<PasswordReset />} />
          <Route path="/setpassword" element={<NewPassword />} />
          <Route path="/PasswordReseted" element={<PasswordReseted />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
