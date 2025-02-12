import styles from "./forgetpassinfo.module.css";

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
    <aside>
      <h1>Reset Password</h1>
      <p>
        We sent a code to <strong>example@gmail.com</strong>
      </p>
    </aside>
  );
}

export default OTP;
