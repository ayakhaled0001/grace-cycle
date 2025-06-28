import styles from "./NewPassword.module.css";
import eye from "../../assets/icons/eye.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/ForgetPassSlice";
import { useNavigate } from "react-router-dom";

function NewPasswordReset() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.forgetPassword.email);
  const token = useSelector((state) => state.forgetPassword.token);

  console.log(email, token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState("");

  const showPassword = () => setInputType("text");
  const hidePassword = () => setInputType("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await dispatch(
        resetPassword({ email, newPassword: password, token })
      ).unwrap();
      navigate("/PasswordReseted");
    } catch (err) {
      setError(
        typeof err === "object"
          ? "Something went wrong. Please try again."
          : err
      );
    }
  };

  return (
    <aside className="aside">
      <h1 className={styles.paddingB}>Set new Password</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputPass}>
          <label htmlFor="InputPass" className={styles.labelPass}>
            New Password
          </label>
          <div className={styles.positioned}>
            <input
              id="InputPass"
              className={styles.pass}
              placeholder="example123##anything"
              name="password"
              type={inputType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={eye}
              className={styles.eye}
              alt="seen"
              onMouseEnter={showPassword}
              onMouseLeave={hidePassword}
            />
          </div>
        </div>
        <div className={styles.inputPass}>
          <label htmlFor="InputPassConfirm" className={styles.labelPass}>
            Confirm Password
          </label>
          <div className={styles.positioned}>
            <input
              id="InputPassConfirm"
              className={styles.pass}
              placeholder="example123##anything"
              name="confirmPassword"
              type={inputType}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              src={eye}
              className={styles.eye}
              alt="seen"
              onMouseEnter={showPassword}
              onMouseLeave={hidePassword}
            />
          </div>
        </div>
        {error && (
          <div className="error text-red-600 text-md font-nunitoBold mb-2">
            {error}
          </div>
        )}
        <button type="submit" className="resetPass">
          Reset Password
        </button>
      </form>
    </aside>
  );
}

export default NewPasswordReset;
