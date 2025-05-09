import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();
function ServicesProvider({ children }) {
  return <ServicesContext.Provider value={}>
    {children}
  </ServicesContext.Provider>;
}

function useServices() {
  const context= useContext(ServicesContext);
  return context;
}
export { ServicesProvider, useServices };
