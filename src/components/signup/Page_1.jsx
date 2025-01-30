import React from "react";
import Vector from '../../assets/icons/Vector.svg';
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const Page_1 = ({ onChange, formData }) => {
  
  const handleOpenMap = () => {
    const latitude = 37.7749;
    const longitude = -122.4194;
    const zoom = 14;
    const url = `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`;

    window.open(url, "_blank");
  };
  
  const formik = useFormik({
    initialValues: {
      location: formData.location || "",
      name: formData.name || "",
      phone: formData.phone || "",
    },
    validationSchema: Yup.object({
      location: Yup.string().required("Location is required"),
      name: Yup.string()
        .required("Organization name is required")
        .min(8, "Name must be at least 8 characters")
        .matches(/^[a-zA-Z\s]*$/, "Name cannot contain numbers or special characters"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^(010|011|012|015)\d{8}$/, "Phone number must start with 010, 011, 012, or 015 and be 11 digits long"),
    }),
    onSubmit: (values) => {
      onChange({ target: { name: "location", value: values.location } });
      onChange({ target: { name: "name", value: values.name } });
      onChange({ target: { name: "phone", value: values.phone } });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-end underline cursor-pointer mb-2 text-[#225A4B]" onClick={handleOpenMap}>
        <img src={Vector} alt="Find" />
        <span>Find</span>
      </div>
      
      {/* Organization Location */}
      <TextField
        id="location"
        label="Organization Location"
        placeholder="Location link on google map"
        fullWidth
        variant="outlined"
        name="location"
        value={formik.values.location}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.location && Boolean(formik.errors.location)}
        sx={{
          backgroundColor: "#dee8e0",
          borderRadius: "20px",
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
            WebkitBoxShadow: "0 0 0px 1000px #dee8e0 inset", // save background color   
            WebkitTextFillColor: "#000", // save text color    
            transition: "background-color 5000s ease-in-out 0s",
            borderRadius: "20px",  
            clipPath: "inset(0 0 0 0 round 20px)", //  background take same border-radius
          },
        }}
        
      />
      {formik.touched.location && formik.errors.location && (
        <span className="text-red-600 text-sm">{formik.errors.location}</span>
      )}

      {/* Organization Name */}
      <TextField
        id="name"
        label="Organization Name"
        placeholder="GraceCycle Company"
        fullWidth
        variant="outlined"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        sx={{
          backgroundColor: "#dee8e0",
          borderRadius: "20px",
          marginTop:"20px",
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
            WebkitBoxShadow: "0 0 0px 1000px #dee8e0 inset", // save background color   
            WebkitTextFillColor: "#000", // save text color    
            transition: "background-color 5000s ease-in-out 0s",
            borderRadius: "20px",  
            clipPath: "inset(0 0 0 0 round 20px)", //  background take same border-radius
          },
        }}
      />
      {formik.touched.name && formik.errors.name && (
        <span className="text-red-600 text-sm">{formik.errors.name}</span>
      )}

      {/* Phone Number */}
      <TextField
        id="phone"
        label="Phone Number"
        placeholder="+20 102 345 5678"
        fullWidth
        variant="outlined"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        sx={{
          backgroundColor: "#dee8e0",
          borderRadius: "20px",
          marginTop:"20px",
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
            WebkitBoxShadow: "0 0 0px 1000px #dee8e0 inset", // save background color   
            WebkitTextFillColor: "#000", // save text color    
            transition: "background-color 5000s ease-in-out 0s",
            borderRadius: "20px",  
            clipPath: "inset(0 0 0 0 round 20px)", //  background take same border-radius
          },
        }}
      />
      {formik.touched.phone && formik.errors.phone && (
        <span className="text-red-600 text-sm">{formik.errors.phone}</span>
      )}

      <button type="submit" style={{ display: 'none' }}>Continue</button>
    </form>
  );
};

export default Page_1;
