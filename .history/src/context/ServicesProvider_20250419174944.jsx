import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();
function ServicesProvider({ children }) {
  return <ServicesContext.Provider value={}>
    {children}
  </ServicesContext.Provider>;
}

function useServices() {
  const context= useContext(ServicesContext);
  if(!context){
    throw new Error("useServices must be within the ServicesProvider")
  }
  return context;
}
export { ServicesProvider, useServices };
