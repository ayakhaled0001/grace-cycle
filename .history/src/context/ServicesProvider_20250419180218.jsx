import { createContext, useContext, useState, useEffect } from "react";

const ServicesContext = createContext();
function ServicesProvider({ children }) {
  // main dishes
  const [isFav, setIsFav] = useState(false);
  const [mainDishes, setMainDishes] = useState([]);
  useEffect(function () {
    async function fetchFoods() {
      try {
        const res = await fetch(
          `https://gracecycleapi.azurewebsites.net/api/web/home/foods`
        );
        const data = await res.json();
        console.log(data["Main Dishes"]);
        setMainDishes(data["Main Dishes"]);
      } catch (error) {
        console.log("Error fetching foods ", error);
      }
    }
    fetchFoods();
  }, []);

  return (
    <ServicesContext.Provider
      value={{ mainDishes, setMainDishes, isFav, setIsFav }}>
      {children}
    </ServicesContext.Provider>
  );
}

function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be within the ServicesProvider");
  }
  return context;
}
export { ServicesProvider, useServices };
