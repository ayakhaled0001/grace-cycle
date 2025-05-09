import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();
function ServicesProvider({ children }) {
  return <ServicesContext.Provider></ServicesContext.Provider>;
}

export default ServicesProvider;
