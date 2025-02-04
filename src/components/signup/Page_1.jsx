import React from "react";
import Vector from "../../assets/icons/Vector.svg";
import TextField from "@mui/material/TextField";

const Page_1 = ({ onChange, formData, errors }) => {
  return (
    <>
      <div
        className="flex justify-end underline cursor-pointer mb-2 text-[#225A4B]"
        onClick={() =>
          window.open(
            `https://www.google.com/maps/@37.7749,-122.4194,14z`,
            "_blank"
          )
        }
      >
        <img src={Vector} alt="Find" />
        <span>Find</span>
      </div>

      <TextField
        id="location"
        label="Organization Location"
        placeholder="Location link on google map"
        fullWidth
        variant="outlined"
        name="location"
        value={formData.location}
        onChange={onChange}
        error={Boolean(errors.location)}
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
      {errors.location && (
        <span className="text-red-600 text-sm">{errors.location}</span>
      )}

      <TextField
        id="name"
        label="Organization Name"
        placeholder="GraceCycle Company"
        fullWidth
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={onChange}
        error={Boolean(errors.name)}
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
      {errors.name && (
        <span className="text-red-600 text-sm">{errors.name}</span>
      )}

      <TextField
        id="phone"
        label="Phone Number"
        placeholder="+20 102 345 5678"
        fullWidth
        variant="outlined"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        error={Boolean(errors.phone)}
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
      {errors.phone && (
        <span className="text-red-600 text-sm">{errors.phone}</span>
      )}
    </>
  );
};

export default Page_1;
