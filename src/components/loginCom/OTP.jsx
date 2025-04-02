import styleOTP from "./OTP.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyOTP } from "../../redux/ForgetPassSlice";
import { useNavigate } from "react-router-dom";
import styles from "./forgetpassinfo.module.css";

function OTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const email = useSelector((state) => state.forgetPassword.email);
  // console.log(email);

  const handleChange = (e, index) => {
    let value = e.target.value;
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (!enteredOtp || enteredOtp.length < 4) {
      setError("Please enter the OTP");
      return;
    }
    try {
      console.log(email, enteredOtp);
      await dispatch(verifyOTP({ email, code: enteredOtp })).unwrap();
      navigate("/setPassword");
    } catch (err) {
      setError(typeof err === 'object' ? "Error happen. Please try again." : err);
    }
  };

  return (
    <aside className="aside">
      <h1 className={styles.h1}>Reset Password</h1>
      <p className={styles.p}>
        We sent a code to <strong>{email}</strong>
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
        {error && <div className="error text-red-600 text-md font-nunitoBold mb-2">{error}</div>}
        <button type="submit" className="resetPass">
          Reset Password
        </button>
      </form>
      <div className="flex flex-col items-center gap-y-3">
        <p className={styles.p}>
          Didn’t receive the email ? <span className={styleOTP.span}>Click to resend</span>
        </p>
      </div>
    </aside>
  );
}

export default OTP;
