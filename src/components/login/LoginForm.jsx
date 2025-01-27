import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import Footer from "./Footer";
import Header from "./Header";
import signupphoto from '../../assets/images/signupphoto.png'


export default function LoginForm() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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

          <InputField
            id="email"
            label="Organization Email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            label="Password"
            placeholder="example123##anything"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end">
            <Link to="/forgetPassword">
              <span className="text-[#D57B21] underline cursor-pointer font-nunito">
                {" "}
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
            >
              Login
            </Button>

            <p className="pt-4">
              Don't have an account?
              <Link to="/">
                <span className="text-[#D57B21] underline cursor-pointer font-nunito">
                  {" "}
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
        />
      </div>
    </>
  );
}
