import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import MobileSteper from "../../components/signup/MobileSteper";
import Box from "@mui/material/Box";
import signupphoto from '../../assets/images/signupphoto.png';
import Page_0 from "../../components/signup/Page_0";
import Page_1 from "../../components/signup/Page_1";
import Page_2 from "../../components/signup/Page_2";
import * as Yup from "yup";

export default function Signup() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    organizationType: '',
    location: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!formData.organizationType) {
        alert("Please select an organization type");
        return;
      }
      setActiveStep(1);
      return;
    }

    if (activeStep === 1) {
      const errors = await validatePage1(formData);
      if (Object.keys(errors).length === 0) {
        setActiveStep(2);
      } else {
        setErrors(errors);
      }
      setActiveStep(2);
      return;
    }

    if (activeStep === 2) {
      const errors = await validatePage2(formData);
      if (Object.keys(errors).length === 0) {
        setActiveStep(3);
        // عند الضغط على "Sign Up" نطبع البيانات في الـ console
        console.log("User Data:", formData);
      } else {
        setErrors(errors);
      }
    }
  };

  const validatePage1 = async (data) => {
    const schema = Yup.object({
      location: Yup.string().required("Location is required"),
      name: Yup.string()
        .required("Organization name is required")
        .min(8, "Name must be at least 8 characters")
        .matches(/^[a-zA-Z\s]*$/, "Name cannot contain numbers or special characters"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^(010|011|012|015)\d{8}$/, "Phone number must start with 010, 011, 012, or 015 and be 11 digits long"),
    });

    try {
      await schema.validate(data, { abortEarly: false });
      return {};
    } catch (err) {
      return err.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
    }
  };

  const validatePage2 = async (data) => {
    const schema = Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

    try {
      await schema.validate(data, { abortEarly: false });
      return {};
    } catch (err) {
      return err.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
    }
  };

  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <div className="bg-offWhite p-8 md:w-1/2 flex justify-center items-center w-[100%] h-screen">
        <Box sx={{ maxWidth: 475, height: 621, flexGrow: 1, margin: "auto", padding: "20px", backgroundColor: "rgb(255 252 246)", borderRadius: "8px" }}>
          {activeStep > 0 && (
            <ArrowBack onClick={handleBack} style={{ cursor: "pointer", marginBottom: "10px" }} />
          )}
          <h3 className="text-[24px] font-bold mx-auto h-20 text-center leading-[100px] font-nunito" style={{ height: activeStep === 0 ? "120px" : "" }}>
            Signup Details
          </h3>

          {activeStep === 0 && <Page_0 onChange={handleChange} formData={formData} />}
          {activeStep === 1 && <Page_1 onChange={handleChange} formData={formData} errors={errors} />}
          {activeStep === 2 && <Page_2 onChange={handleChange} formData={formData} errors={errors} onSubmit={handleNext} />}

          <MobileSteper activeStep={activeStep} setActiveStep={handleNext} onSubmit={handleNext} />
        </Box>
      </div>
      <div className="md:w-1/2 hidden md:flex lg:flex">
        <img src={signupphoto} alt="photo" className="object-cover h-full w-full" />
      </div>
    </div>
  );
}
