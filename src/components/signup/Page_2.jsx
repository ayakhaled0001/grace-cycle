import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const Page_2 = ({ onChange, formData }) => {
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
        onBlur={formik.handleBlur} // يجب إضافة هذا السطر
        error={formik.touched.email && Boolean(formik.errors.email)} // عرض الخطأ إذا كانت البيانات غير صحيحة
        helperText={formik.touched.email && formik.errors.email} // عرض الرسالة إذا كان هناك خطأ
        style={{
          width: "100%",
          borderRadius: "20px",
          marginTop: "30px",
          marginBottom: "20px",
          backgroundColor: "#dee8e0",
        }}
      />
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
        onBlur={formik.handleBlur} // يجب إضافة هذا السطر
        error={formik.touched.password && Boolean(formik.errors.password)} // عرض الخطأ إذا كانت البيانات غير صحيحة
        helperText={formik.touched.password && formik.errors.password} // عرض الرسالة إذا كان هناك خطأ
        style={{
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#dee8e0",
        }}
      />
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
        onBlur={formik.handleBlur} // يجب إضافة هذا السطر
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} // عرض الخطأ إذا كانت البيانات غير صحيحة
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} // عرض الرسالة إذا كان هناك خطأ
        style={{
          width: "100%",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "#dee8e0",
          marginBottom: "10px",
        }}
      />
      <button type="submit" style={{ display: "none" }}>Continue</button>
    </form>
  );
};

export default Page_2;