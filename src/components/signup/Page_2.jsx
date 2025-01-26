import React from "react";
import TextField from "@mui/material/TextField";

const Page_2 = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <>
      <TextField
        id="email"
        label="Organization Email"
        placeholder="example@gmail.com"
        type="text"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // multiline
        style={{
          width: "100%",
          borderRadius: "20px",
          marginTop: "30px",
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
              fontSize: "18px",
            },
          },
        }}
      />
      <TextField
        id="password"
        label="Password"
        placeholder="example123##anything"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <TextField
        id="confirm-password"
        label="Confirm Password"
        placeholder="example123##anything"
        type="password"
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          width: "100%",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "#dee8e0",
          marginBottom: "10px",
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
    </>
  );
};

export default Page_2;
