import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();
function ServicesProvider({ children }) {
  return <ServicesContext.Provider value={}></ServicesContext.Provider>;
}

function useService() {
  const useServices = useContext(ServicesContext);
  return useServices;
}
export { ServicesProvider, useService };
