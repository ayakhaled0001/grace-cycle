import React from "react";
import TextField from "@mui/material/TextField";

const Page_2 = ({ onChange, formData, errors }) => {
  return (
    <>
      <TextField
        id="email"
        label="Organization Email"
        placeholder="example@gmail.com"
        type="text"
        variant="outlined"
        fullWidth
        name="email"
        value={formData.email}
        onChange={onChange}
        error={Boolean(errors.email)}
        sx={{
          backgroundColor: "#dee8e0",
          borderRadius: "20px",
          marginTop: "20px",
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
      {errors.email && (
        <span className="text-red-600 text-sm">{errors.email}</span>
      )}

      <TextField
        id="password"
        label="Password"
        placeholder="example123##anything"
        type="password"
        variant="outlined"
        fullWidth
        name="password"
        value={formData.password}
        onChange={onChange}
        error={Boolean(errors.password)}
        sx={{
          backgroundColor: "#dee8e0",
          borderRadius: "20px",
          marginTop: "20px",
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
      {errors.password && (
        <span className="text-red-600 text-sm">{errors.password}</span>
      )}

      <TextField
        id="confirm-password"
        label="Confirm Password"
        placeholder="example123##anything"
        type="password"
        variant="outlined"
        fullWidth
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        error={Boolean(errors.confirmPassword)}
        sx={{
          backgroundColor: "#dee8e0",
          borderRadius: "20px",
          marginTop: "20px",
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
      {errors.confirmPassword && (
        <span className="text-red-600 text-sm">{errors.confirmPassword}</span>
      )}
    </>
  );
};

export default Page_2;
