import React from "react";
import styles from "./HomePage.module.css";
import Swal from "sweetalert2";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";
import MainDishes from "../../components/charityCom/MainDishes";
import AddNewItemForm from "../../components/vendorCom/AddNewItemForm";

const PublicServicesPage = () => {
  const handleJoinClick = () => {
    Swal.fire({
      title: "Join Us!",
      text: "Sign up now to help reduce food waste and unlock all features!",
      icon: "info",
      confirmButtonText: "Sign Up",
      confirmButtonColor: "#225A4A",
      showCancelButton: true,
      cancelButtonText: "Maybe later",
      cancelButtonColor: "#BC0101",
    });
  };

  // Intercept Add to Cart/More Details in MainDishes
  React.useEffect(() => {
    // Wait for MainDishes to render
    const interval = setInterval(() => {
      // Find all 'More Details' and 'Add to Cart' buttons
      const buttons = Array.from(document.querySelectorAll("a,button")).filter(
        (el) =>
          el.textContent.trim() === "More Details" ||
          el.textContent.trim() === "Add to Cart"
      );
      buttons.forEach((btn) => {
        if (!btn.dataset.signupIntercepted) {
          btn.dataset.signupIntercepted = "1";
          btn.onclick = (e) => {
            e.preventDefault();
            Swal.fire({
              title: "Sign up first!",
              text: "Please sign up to add items to your cart and access full features.",
              icon: "info",
              confirmButtonText: "Sign Up",
              confirmButtonColor: "#225A4A",
            });
            return false;
          };
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Intercept Add New Item submit
  const handleVendorSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Sign up first!",
      text: "Please sign up to add new items and access full features.",
      icon: "info",
      confirmButtonText: "Sign Up",
      confirmButtonColor: "#225A4A",
    });
  };

  return (
    <div style={{ minHeight: "100vh", padding: 0, margin: 0 }}>
      <HomeNav backgroundColor="bg-bgBeigeWhite" />
      <div className={styles.mainSec}>
        <div className="max-w-5xl mx-auto py-16 px-4 flex flex-col items-center">
          {/* Hero Section */}
          <h1 className="text-4xl md:text-5xl font-nunitoBold text-[#225A4A] mb-4 text-center drop-shadow-lg">
            Welcome to Grace Cycle
          </h1>
          <p className="text-lg md:text-2xl text-[#225A4A] mb-8 text-center max-w-2xl">
            Grace Cycle is a platform that connects charities and vendors to
            fight food waste. Discover how you can make a difference—whether you
            want to donate, receive, or simply learn more!
          </p>
          <button
            onClick={handleJoinClick}
            className="bg-[#225A4A] text-white font-nunitoBold px-8 py-3 rounded-xl text-xl shadow-lg hover:bg-[#174032] transition mb-12 animate-bounce"
          >
            Join the Movement
          </button>

          {/* Charity Preview */}
          <div className="w-full bg-white/90 rounded-2xl shadow-lg p-8 mb-10 flex flex-col md:flex-col items-center gap-8">
            <img
              src="/public/homeMedia/personreview1.png"
              alt="Charity preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#225A4A] shadow-md mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-nunitoBold text-[#225A4A] mb-2 mx-auto">
                For Charities
              </h2>
              <ul className="list-disc ml-6 text-lg text-[#225A4A] space-y-1 mb-4">
                <li>Browse available food donations from local vendors</li>
                <li>Reserve and collect food easily</li>
                <li>Track your impact and share your story</li>
              </ul>
              {/* MainDishes Component as is */}
              <div className="w-full mx-auto">
                <MainDishes />
              </div>
            </div>
          </div>

          {/* Vendor Preview */}
          <div className="w-full bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col md:flex-col items-center gap-8">
            <img
              src="/public/services/foodlistingtest.png"
              alt="Vendor preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#BC0101] shadow-md mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-nunitoBold text-[#BC0101] mb-2">
                For Vendors
              </h2>
              <ul className="list-disc ml-6 text-lg text-[#BC0101] space-y-1 mb-4">
                <li>List surplus food and reach local charities</li>
                <li>Reduce waste and support your community</li>
                <li>Track donations and receive recognition</li>
              </ul>
              {/* AddNewItemForm Component as is, with submit intercepted */}
              <div className="w-full mx-auto mt-20">
                <form onSubmit={handleVendorSubmit}>
                  <AddNewItemForm type="product" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default PublicServicesPage;
