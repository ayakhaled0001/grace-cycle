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
  return <aside></aside>;
}

export default OTP;
