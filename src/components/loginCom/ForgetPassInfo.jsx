import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../redux/ForgetPassSlice";
import styles from "./forgetpassinfo.module.css";
import { useNavigate } from "react-router-dom";
import { setEmailAction } from "../../redux/ForgetPassSlice";

function ForgetPassInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedEmail = useSelector((state) => state.forgetPassword.email);
  const [email, setEmail] = useState(storedEmail || "");
  const [errorMessage, setErrorMessage] = useState(""); // حالة لحفظ رسالة الخطأ

  const { isLoading } = useSelector((state) => state.forgetPassword);

  // وظيفة التحقق من صحة الإيميل
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من إدخال الإيميل
    if (!email) {
      setErrorMessage("Please enter your email");
      return;
    }

    // التحقق من صحة الإيميل
    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    setErrorMessage("");
    dispatch(setEmailAction(email));

    try {
      const response = await dispatch(sendEmail({ email })).unwrap();
      alert(response.message);
      navigate("/OTP");
    } catch (err) {
      setErrorMessage(
        typeof err === "object" ? "An error occurred during signup" : err
      );
    }
  };

  return (
    <aside className="aside">
      <h1 className={styles.h1}>Forget Password ?</h1>
      <p className={styles.p}>No worries, we’ll send you reset instructions.</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.orgEmail}>
          <label htmlFor="orgEmail" className={styles.orgLabel}>
            Organization Email
          </label>
          <input
            id="orgEmail"
            className={styles.orgInput}
            placeholder="example@gmail.com"
            name="orgEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errorMessage && (
          <span className="text-red-600 text-md font-nunitoBold mb-2">
            {errorMessage}
          </span>
        )}

        <button className="resetPass" type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Reset Password"}
        </button>
      </form>
    </aside>
  );
}

export default ForgetPassInfo;
