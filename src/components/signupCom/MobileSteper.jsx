import React from "react";
import { Link } from "react-router-dom";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const MobileSteper = ({ activeStep, setActiveStep, onSubmit, loading }) => {
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
                onSubmit();
              } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              }
            }}
            sx={{
              marginTop: "10px",
              backgroundColor: "#225A4B",
              height: { xs: "40px", sm: "46px" },
              width: { xs: "100%", sm: "387px" },
              color: "white",
              fontFamily: "'Nunito', sans-serif",
              textTransform: "capitalize",
              fontSize: { xs: "16px", sm: "18px" },
              borderRadius: "8px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : activeStep === 2 ? (
              "Sign Up"
            ) : (
              "Continue"
            )}
          </Button>
          <p className="pt-4 text-sm sm:text-base">
            Already have an account?
            <Link to="/login">
              <span className="text-[#D57B21] underline cursor-pointer">
                {" "}
                login
              </span>
            </Link>
          </p>
          {/* Google button removed */}
        </>
      }
    />
  );
};

export default MobileSteper;
