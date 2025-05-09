import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();
function ServicesProvider({ children }) {
  return <ServicesContext.Provider></ServicesContext.Provider>;
}

function useServices() {
  const useServices = useContext(ServicesContext);
  return useServices;
}
export ServicesProvider;
