import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import MobileSteper from "../../components/signup/MobileSteper";
import Box from "@mui/material/Box";
import signupphoto from '../../assets/images/signupphoto.png'
import Page_0 from "../../components/signup/Page_0";
import Page_1 from "../../components/signup/Page_1";
import Page_2 from "../../components/signup/Page_2";


export default function Signup() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row md:flex-row h-screen">
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
            {activeStep > 0 && (
              <ArrowBack
                onClick={handleBack}
                style={{ cursor: "pointer", marginBottom: "10px" }}
                disabled={activeStep === 0}
              />
            )}
            <h3
              className="text-[24px] font-bold mx-auto h-20 text-center leading-[100px] font-nunito"
              style={{
                height: activeStep === 0 ? "120px" : "",
              }}
            >
              Signup Details
            </h3>

            {activeStep === 0 && <Page_0 />}
            {activeStep === 1 && <Page_1 />}
            {activeStep === 2 && <Page_2 />}

            <MobileSteper activeStep={activeStep} setActiveStep={setActiveStep}/>
          </Box>
        </div>
        <div className="md:w-1/2 hidden md:flex lg:flex">
          <img src={signupphoto} alt="photo" className="object-cover h-full w-full" />
        </div>
      </div>
    </>
  );
}
