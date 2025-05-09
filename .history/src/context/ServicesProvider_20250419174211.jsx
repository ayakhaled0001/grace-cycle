import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();
function ServicesProvider() {
  return <ServicesContext.Provider></ServicesContext.Provider>;
}

export default ServicesContext;
