import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import signupphoto from "../../assets/images/signupphoto.png";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/AuthSlice";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [serverMessage, setServerMessage] = React.useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 4;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setServerMessage("");

    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 4 characters.");
      isValid = false;
    }

    if (isValid) {
      dispatch(loginUser({ email, password }))
        .unwrap()
        .then((action) => {
          console.log("Login successful:", action);
          navigate("/");
        })
        .catch((err) => {
          console.error("Error from server:", err);
          setServerMessage(
            typeof err === "object" ? "An error occurred during login" : err
          );
        });
    }
  };

  return (
    <>
      <div className="bg-offWhite p-8 md:w-1/2 flex justify-center items-center w-[100%] h-screen">
        <Box
          sx={{
            maxWidth: 475,
            height: 621,
            flexGrow: 1,
            margin: "auto",
            padding: "20px",
            backgroundColor: "rgb(255 252 246)",
            borderRadius: "8px",
          }}
        >
          <Header />
          
          <TextField
            id="email"
            label="Organization Email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            error={Boolean(emailError)}
            sx={{
              backgroundColor: "#dee8e0",
              borderRadius: "20px",
              marginTop:"20px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px", 
                "& fieldset": { borderRadius: "20px" },
                "&:hover fieldset": { borderColor: "#225A4B" },
                "&.Mui-focused fieldset": { borderColor: "#225A4B" },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": { color: "#000", fontWeight: "bold" },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0px 1000px #dee8e0 inset", 
                WebkitTextFillColor: "#000", 
                transition: "background-color 5000s ease-in-out 0s",
                borderRadius: "20px",  
                clipPath: "inset(0 0 0 0 round 20px)",
              },
            }}
          />
          {emailError && (
            <span className="text-red-600 text-sm">{emailError}</span>
          )}

          <TextField
            id="password"
            label="Password"
            placeholder="example123##anything"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            error={Boolean(passwordError)}
            sx={{
              backgroundColor: "#dee8e0",
              borderRadius: "20px",
              marginTop: "20px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": { borderRadius: "20px" },
                "&:hover fieldset": { borderColor: "#225A4B" },
                "&.Mui-focused fieldset": { borderColor: "#225A4B" },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": { color: "#000", fontWeight: "bold" },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0px 1000px #dee8e0 inset",
                WebkitTextFillColor: "#000",
                transition: "background-color 5000s ease-in-out 0s",
                borderRadius: "20px",
                clipPath: "inset(0 0 0 0 round 20px)",
              },
            }}
          />
          {passwordError && (
            <span className="text-red-600 text-sm">{passwordError}</span>
          )}

          {serverMessage && (
            <div className="flex justify-center items-center mb-2">
              <span className="text-red-600 font-semibold">
                {serverMessage}
              </span>
            </div>
          )}

          <div className="flex justify-end">
            <Link to="/forgetPassword">
              <span className="text-[#D57B21] underline cursor-pointer font-nunito">
                Forget Password
              </span>
            </Link>
          </div>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              backgroundColor: "transparent",
              padding: "16px",
            }}
          >
            <Button
              size="large"
              onClick={handleLogin}
              sx={{
                marginTop: "10px",
                backgroundColor: "#225A4B",
                height: "46px",
                width: "387px",
                color: "white",
                borderRadius: "8px",
                textTransform: "capitalize",
                fontSize: "18px",
              }}
              className="font-nunitoBold"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>

            <p className="pt-4">
              Don&apos;t have an account?
              <Link to="/signup">
                <span className="text-[#D57B21] underline cursor-pointer font-nunito">
                  Signup
                </span>
              </Link>
            </p>
            <Footer />
          </Box>
        </Box>
      </div>
      <div className="md:w-1/2 hidden md:flex lg:flex">
        <img
          src={signupphoto}
          alt="photo"
          className="object-cover h-full w-full"
          loading="lazy"
        />
      </div>
    </>
  );
}