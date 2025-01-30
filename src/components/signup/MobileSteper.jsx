// MobileSteper.jsx
import React from "react";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import google from "../../assets/icons/google.svg";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

const MobileSteper = ({ activeStep, setActiveStep, onSubmit }) => {
  return (
    <MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={activeStep}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "transparent",
        "& .MuiMobileStepper-dot": {
          marginLeft: "15px",
          marginBottom: "5px",
        },
        "& .MuiMobileStepper-dotActive": {
          backgroundColor: "#D57B21",
        },
      }}
      nextButton={
        <>
          <Button
            size="small"
            onClick={() => {
              if (activeStep === 2) {
                onSubmit(); // استدعاء دالة التسجيل
              } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              }
            }}
            // disabled={activeStep === 2}
            style={{
              marginTop: "10px",
              backgroundColor: "#225A4B",
              height: "46px",
              width: "387px",
              color: "white",
              fontFamily: "'Nunito', sans-serif",
              textTransform: "capitalize",
              fontSize: "18px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {activeStep === 2 ? "Sign Up" : "Continue"}
          </Button>
          <p className="pt-4">
            Already have an account?
            <Link to="/login">
              <span className="text-[#D57B21] underline cursor-pointer">
                {" "}
                login
              </span>
            </Link>
          </p>
          <Divider style={{ borderColor: "#000", width: "10px" }}>OR</Divider>
          <Button
            size="small"
            style={{
              marginTop: "10px",
              height: "46px",
              width: "387px",
              color: "#225A4B",
              fontFamily: "'Nunito', sans-serif",
              textTransform: "capitalize",
              fontSize: "18px",
              border: "solid #225A4B 1px",
              borderRadius: "8px",
            }}
          >
            <img src={google} alt="Google" />
            Google
          </Button>
        </>
      }
    />
  );
};

export default MobileSteper;