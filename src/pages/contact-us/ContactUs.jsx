import React from "react";
import Contact from "../../components/contactCom/Contact";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";

const ContactUs = () => {
  return (
    <>
      <HomeNav backgroundColor="bg-offWhite" />
      <Contact />
      <HomeFooter />
    </>
  );
};

export default ContactUs;
