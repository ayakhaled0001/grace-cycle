import React from "react";
import { Divider } from "antd";
import Button from "@mui/material/Button";
import google from '../../assets/icons/google.svg'

const Footer = () => {
  return (
    <>
      <Divider style={{ borderColor: "#000", width: "10px" }}>OR</Divider>
      <Button
        size="large"
        sx={{
          marginTop: "10px",
          height: "46px",
          width: "387px",
          color: "#225A4B",
          fontFamily: "'Nunito', sans-serif",
          textTransform: "capitalize",
          fontSize: "18px",
          border: "solid #225A4B 1px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={google} alt="google" className="mr-1" />
        Google
      </Button>
    </>
  );
};

export default Footer;
