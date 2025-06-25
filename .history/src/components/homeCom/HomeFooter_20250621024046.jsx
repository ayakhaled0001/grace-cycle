import facebook from "../../assets/icons/facebook.svg";
import instgram from "../../assets/icons/instgram.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import twitter from "../../assets/icons/twitter.svg";
import send from "../../assets/icons/send.svg";
import { Link } from "react-router-dom";

function HomeFooter() {
  return (
    <footer>
      <div className="footer-content bg-darkGreen w-[100%] min-h-96 flex justify-around flex-col md:flex-row lg:flex">
        <div className="footer-section p-8">
          <div className="footer-logo">
            <img src="/logo.png" alt="Logo" className="w-40" />
            <p className="font-nunitoBold text-bgBeigeWhite">
              We will help you reduce your food waste
            </p>
            <div className="social-icons flex justify-around items-center w-[80%] p-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577251423602"
                className="social-icon w-8 h-8 bg-bgBeigeWhite rounded-full flex justify-center items-center">
                <img src={facebook} alt="Facebook" className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                className="social-icon w-8 h-8 bg-bgBeigeWhite rounded-full flex justify-center items-center">
                <img src={instgram} alt="instgram" className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/grace-cycle-bba54a370/"
                className="social-icon w-8 h-8 bg-bgBeigeWhite rounded-full flex justify-center items-center">
                <img src={linkedin} alt="linkedin" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-section p-4 pt-8 ">
          <h3 className="font-nunitoBold text-xl">Browses</h3>
          <ul className="py-5 text-offWhite">
            <li className="py-2">
              <Link to="/">Home</Link>
            </li>
            <li className="py-2">
              <Link to="/CharityPage">Services</Link>
            </li>
            <li className="py-2">
              <Link to="/about">About Us</Link>
            </li>
            <li className="py-2">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="py-2">
              <a href="#link4">Reviews</a>
            </li>
            <li className="py-2">
              <a href="#link4">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section p-4 pt-8 ">
          <h3 className="font-nunitoBold text-xl">Helpful Links</h3>
          <ul className="py-5 text-offWhite">
            <li className="py-2">
              <a href="#link5">Support</a>
            </li>
            <li className="py-2">
              <a href="#link6">Terms&Condition</a>
            </li>
            <li className="py-2">
              <a href="#link7">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section p-10 pt-8">
          <h3 className="font-nunitoBold text-xl">Subscribe</h3>
          <p className="font-nunitoBold text-bgBeigeWhite">
            Subscribe to our community to get important news
          </p>
          <div className="flex justify-between items-center w-[65%] mt-4">
            <input
              type="email"
              placeholder="Email address"
              className="border border-offWhite bg-transparent placeholder:font-light placeholder-offWhite text-sm font-nunitoBold p-2 rounded"
            />
            <button className="w-10 h-10 bg-bgBeigeWhite rounded-lg flex justify-center items-center">
              <img src={send} alt="instgram" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
