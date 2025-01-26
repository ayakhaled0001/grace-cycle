import React from "react";
import Vector from '../../assets/icons/Vector.svg'
import TextField from "@mui/material/TextField";


const Page_1 = () => {

    const handleOpenMap = () => {
        const latitude = 37.7749;
        const longitude = -122.4194;
        const zoom = 14;
        const url = `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`;
    
        window.open(url, "_blank");
      };

  return (
    <>
      <div
        className="flex justify-end underline cursor-pointer mb-2 text-[#225A4B]"
        onClick={handleOpenMap}
      >
        <img src={Vector} />
        <span>Find</span>
      </div>
      <TextField
        id="location"
        label="Organization Location"
        placeholder="Egypt , Cairo , Talaat Harb Street"
        style={{
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#dee8e0",
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "20px",
            },
            "&:hover fieldset": {
              borderColor: "#225A4B",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#225A4B",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#000",
              fontWeight: "bold",
            },
          },
        }}
      />
      <TextField
        id="name"
        label="Organization Name"
        placeholder="GraceCycle Company"
        style={{
          width: "100%",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "#dee8e0",
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "20px",
            },
            "&:hover fieldset": {
              borderColor: "#225A4B",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#225A4B",
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px #dee8e0 inset`,
              WebkitTextFillColor: "#000",
              borderRadius: "20px",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#000",
              fontWeight: "bold",
            },
          },
        }}
      />
      <TextField
        id="phone"
        label="Phone Number"
        placeholder="+20 102 345 5678"
        // multiline
        style={{
          width: "100%",
          borderRadius: "20px",
          marginTop: "20px",
          marginBottom: "10px",
          backgroundColor: "#dee8e0",
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "20px",
            },
            "&:hover fieldset": {
              borderColor: "#225A4B",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#225A4B",
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px #dee8e0 inset`,
              WebkitTextFillColor: "#000",
              borderRadius: "20px",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#000",
              fontWeight: "bold",
            },
          },
        }}
      />
    </>
  );
};

export default Page_1;
