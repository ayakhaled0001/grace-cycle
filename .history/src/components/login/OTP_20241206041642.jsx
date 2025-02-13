import styleOTP from "./OTP.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";

function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    let value = e.target.value;
    if (value.length > 1) {
      value = value.slice(0, 1); // Only allow one character per input
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus(); // Auto focus to next input field
    }
  };
  // Function to handle form submission and OTP validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      //  mock OTP
      alert("OTP validated successfully!");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };
  return (
    <aside className="aside">
      <h1>Reset Password</h1>
      <p>
        We sent a code to <strong>example@gmail.com</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styleOTP.otpInputs}>
          {otp.map((value, index) => (
            <input
              key={index}
              className={styleOTP.inputOTP}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </div>
        {error && <div className="error">{error}</div>}
        <button className="resetPass">
          <Link to="resetpassword" className="resetPassLink">
            Reset Password
          </Link>
        </button>
      </form>
      <p>
        Didn’t receive the email ? <span>Click to resend</span>
      </p>

      <Link to="" className="backToLink">
        <img src={arrow} /> Back to Log in
      </Link>
    </aside>
  );
}

export default OTP;
