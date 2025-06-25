import facebook from "../../assets/icons/facebook.svg";
import instgram from "../../assets/icons/instgram.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import twitter from "../../assets/icons/twitter.svg";
import send from "../../assets/icons/send.svg";
import { Link } from "react-router-dom";

function HomeFooter() {
  return (
    <footer>
      <div className="footer-content bg-darkGreen w-[100%] min-h-64 md:min-h-96 flex justify-around flex-col md:flex-row lg:flex">
        <div className="footer-section p-4 md:p-8">
          <div className="footer-logo">
            <img src="logo.png" alt="Logo" className="w-32 md:w-40" />
            <p className="font-nunitoBold text-bgBeigeWhite text-sm md:text-base">
              We will help you reduce your food waste
            </p>
            <div className="social-icons flex justify-around items-center w-[80%] p-2 md:p-4">
              <a
                href="https://facebook.com"
                className="social-icon w-6 h-6 md:w-8 md:h-8 bg-bgBeigeWhite rounded-full flex justify-center items-center"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              </a>
              <a
                href="https://instagram.com"
                className="social-icon w-6 h-6 md:w-8 md:h-8 bg-bgBeigeWhite rounded-full flex justify-center items-center"
              >
                <img
                  src={instgram}
                  alt="instgram"
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              </a>
              <a
                href="https://linkedin.com"
                className="social-icon w-6 h-6 md:w-8 md:h-8 bg-bgBeigeWhite rounded-full flex justify-center items-center"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              </a>
              <a
                href="https://twitter.com"
                className="social-icon w-6 h-6 md:w-8 md:h-8 bg-bgBeigeWhite rounded-full flex justify-center items-center"
              >
                <img
                  src={twitter}
                  alt="twitter"
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-section p-4 pt-4 md:pt-8">
          <h3 className="font-nunitoBold text-lg md:text-xl">Browses</h3>
          <ul className="py-3 md:py-5 text-offWhite text-sm md:text-base">
            <li className="py-1 md:py-2">
              <Link to="/">Home</Link>
            </li>
            <li className="py-1 md:py-2">
              <Link to="/CharityPage">Services</Link>
            </li>
            <li className="py-1 md:py-2">
              <Link to="/about">About Us</Link>
            </li>
            <li className="py-1 md:py-2">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="py-1 md:py-2">
              <a href="#link4">Reviews</a>
            </li>
            <li className="py-1 md:py-2">
              <a href="#link4">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section p-4 pt-4 md:pt-8">
          <h3 className="font-nunitoBold text-lg md:text-xl">Helpful Links</h3>
          <ul className="py-3 md:py-5 text-offWhite text-sm md:text-base">
            <li className="py-1 md:py-2">
              <a href="#link5">Support</a>
            </li>
            <li className="py-1 md:py-2">
              <a href="#link6">Terms&Condition</a>
            </li>
            <li className="py-1 md:py-2">
              <a href="#link7">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section p-4 md:p-10 pt-4 md:pt-8">
          <h3 className="font-nunitoBold text-lg md:text-xl">Subscribe</h3>
          <p className="font-nunitoBold text-bgBeigeWhite text-sm md:text-base">
            Subscribe to our community to get important news
          </p>
          <div className="flex justify-between items-center w-full md:w-[65%] mt-3 md:mt-4">
            <input
              type="email"
              placeholder="Email address"
              className="border border-offWhite bg-transparent placeholder:font-light placeholder-offWhite text-xs md:text-sm font-nunitoBold p-1.5 md:p-2 rounded flex-1 mr-2"
            />
            <button className="w-8 h-8 md:w-10 md:h-10 bg-bgBeigeWhite rounded-lg flex justify-center items-center flex-shrink-0">
              <img
                src={send}
                alt="instgram"
                className="w-4 h-4 md:w-6 md:h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
