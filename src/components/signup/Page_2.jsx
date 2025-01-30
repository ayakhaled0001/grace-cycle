import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const Page_2 = ({ onChange, formData, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: formData.email || "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords do not match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      onChange({ target: { name: "email", value: values.email } });
      onChange({ target: { name: "password", value: values.password } });

      // عند الضغط على زر "Sign Up" نطبع البيانات في الـ console
      onSubmit(values); // تمرير البيانات إلى الدالة على مستوى الأب
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="email"
        label="Organization Email"
        placeholder="example@gmail.com"
        type="text"
        variant="outlined"
        fullWidth
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
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
      {formik.touched.email && formik.errors.email && (
        <span className="text-red-600 text-sm">{formik.errors.email}</span>
      )}
      <TextField
        id="password"
        label="Password"
        placeholder="example123##anything"
        type="password"
        variant="outlined"
        fullWidth
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
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
      {formik.touched.password && formik.errors.password && (
        <span className="text-red-600 text-sm">{formik.errors.password}</span>
      )}
      <TextField
        id="confirm-password"
        label="Confirm Password"
        placeholder="example123##anything"
        type="password"
        variant="outlined"
        fullWidth
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
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
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <span className="text-red-600 text-sm">{formik.errors.confirmPassword}</span>
      )}
      <button type="submit" style={{ display: "none" }}>Continue</button>
    </form>
  );
};

export default Page_2;
