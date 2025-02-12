import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import MobileSteper from "../../components/signup/MobileSteper";
import Box from "@mui/material/Box";
import signupphoto from "../../assets/images/signupphoto.png";
import Page_0 from "../../components/signup/Page_0";
import Page_1 from "../../components/signup/Page_1";
import Page_2 from "../../components/signup/Page_2";
import { signupUser } from "../../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";


export default function Signup() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = React.useState(""); 
  const [loading, setLoading] = React.useState(false); 

  const [formData, setFormData] = React.useState({
    organizationType: "",
    location: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validatePage0 = () => {
    if (!formData.organizationType) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organizationType: "Please select an organization type",
      }));
      return false;
    }
    return true;
  };

  const validatePage1 = () => {
    const newErrors = {};
  
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.name) newErrors.name = "Organization name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
  
    if (formData.name && formData.name.length < 8) {
      newErrors.name = "Name must be at least 8 characters long";
    }
  
    if (formData.name && /^\d+$/.test(formData.name)) {
      newErrors.name = "Name cannot contain only numbers; it must include letters";
    }
  
    if (formData.phone && !/^01/.test(formData.phone)) {
      newErrors.phone = "Phone number must start with '01'";
    }
  
    if (formData.phone && formData.phone.length !== 11) {
      newErrors.phone = "Phone number must be exactly 11 digits long";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  const validatePage2 = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords must match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && validatePage0()) {
      setActiveStep(1);
    } else if (activeStep === 1 && validatePage1()) {
      setActiveStep(2);
    } else if (activeStep === 2 && validatePage2()) {
      setLoading(true); // بدء التحميل

      dispatch(
        signupUser({
          username: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.location,
          userType: formData.organizationType,
          phoneNumber: formData.phone,
        })
      )
        .unwrap()
        .then((payload) => {
          setLoading(false); 
          console.log("payload", payload);
          navigate("/");
          Swal.fire({
            icon: "success",
            title: "🎉 تم التسجيل بنجاح!",
            showConfirmButton: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          setLoading(false); 
          console.error("Error from server:", err);
          // toast.error("❌ حدث خطأ أثناء التسجيل!");
          setServerMessage(
            typeof err === 'object' ? "An error occurred during signup" : err
          );
        });
    }
  };

  return (
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
            />
          )}
          <h3
            className="text-[24px] font-bold mx-auto h-20 text-center leading-[100px] font-nunitoBold"
            style={{ height: activeStep === 0 ? "120px" : "" }}
          >
            Signup Details
          </h3>
          {activeStep === 0 && (
            <Page_0
              onChange={handleChange}
              formData={formData}
              errors={errors}
            />
          )}
          {activeStep === 1 && (
            <Page_1
              onChange={handleChange}
              formData={formData}
              errors={errors}
            />
          )}
          {activeStep === 2 && (
            <Page_2
              onChange={handleChange}
              formData={formData}
              errors={errors}
            />
          )}
          {serverMessage && (
            <div className="flex justify-center items-center mb-2">
              <span className="text-red-600 font-semibold">
                {serverMessage}
              </span>
            </div>
          )}
          <MobileSteper
            activeStep={activeStep}
            setActiveStep={handleNext}
            onSubmit={handleNext}
            loading={loading}
          />
        </Box>
      </div>
      <div className="md:w-1/2 hidden md:flex lg:flex">
        <img
          src={signupphoto}
          alt="photo"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}
