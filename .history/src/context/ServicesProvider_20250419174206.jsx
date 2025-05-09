import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();
function ServicesProvider() {
  return <ServicesContext;
}

export default ServicesContext;
