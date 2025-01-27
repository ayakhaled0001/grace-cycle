import React from "react";
import TextField from "@mui/material/TextField";

const InputField = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      placeholder={props.placeholder}
      type="text"
      variant="outlined"
      fullWidth
      value={props.value}
      onChange={props.onChange}
      // multiline
      style={{
        width: "100%",
        borderRadius: "20px",
        marginBottom: "20px",
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
            fontSize: "17px",
          },
        },
      }}
    />
  );
};

export default InputField;
